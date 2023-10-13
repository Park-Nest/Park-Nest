import React, { useEffect, useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Grid, Typography, Paper, Box, Button } from "@mui/material"
import { GlobalContext } from "../context/GlobalState.js";
import { AttachMoney, AccessTime, Map, Description } from "@mui/icons-material";
import { setDefaults, fromAddress } from "react-geocode";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import GoogleMapApi from "../components/googlemapswrapper.jsx";

const ConfirmedBooking = () => {
    const [listingID, setListingID] = useState(0);
    const [myBooking, setMyBooking] = useState({});
    const [latLng, setLatLng] = useState([]);
    const location = useLocation();
    const context = useContext(GlobalContext);
    const navigate = useNavigate();

    let passedInID = location.state.id;
    let userBookings = context.userBookings;
    let currBooking = useRef({})

    userBookings.forEach((booking) => {
        if (booking.listingid === passedInID) currBooking.current = booking;
    })

    useEffect(() => {
        //Set listingID so it can be deleted from Bookings table (passed to cancel button)
        setListingID(passedInID)
        //set myBooking so it persist the re-render
        setMyBooking(currBooking.current)
    }, [])

    useEffect(() => {
         //Google Geocoder - get lat/long from address
         setDefaults({
            key: process.env.REACT_APP_GOOGLE_API,
            language: "en",
            region: "es"
        })
        fromAddress(`${currBooking.current.address + ' ' + currBooking.current.city + ' ' + currBooking.current.state}`)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                setLatLng([{lat: lat, lng: lng}])
            })
            .catch(console.err)
    }, [])
   
    function deleteBooking(listingID){
        console.log('listingID to delete: ', listingID)
        fetch('/home/deleteBooking', {
            method: 'DELETE',
            body: JSON.stringify({id: listingID}),
            headers: { 'Content-Type': 'application/json'}
        }).then(() => {
            alert('Booking Deleted!')
            navigate('/Profile')
        }).catch(() => console.log('delete booking request failed'))
    }
    
    return(
        <div>
        <Navbar />
        <Container sx={{marginY: 5}}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper elevation={4}>
                        <img src={myBooking.photo} alt="parking spot" className="one-spot"/>
                        <Box sx={{paddingX: 1, justifyContent: "center", display: "flex",}}>
                            <Typography variant="h4" component="h2">
                                {myBooking.name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "7px",
                            }}
                        >
                            <Map style={{ width: 15 }} />
                            <Typography variant="subtitle1" component="p" marginLeft={1}>
                                {myBooking.address}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "7px",
                            }}
                        >
                            <AttachMoney style={{ width: 15 }} />
                            <Typography variant="subtitle1" component="p" marginLeft={1}>
                                ${myBooking.rate}/Hour
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "7px"
                            }}
                        >
                            <AccessTime style={{ width: 15 }} />
                            <Typography variant="subtitle1" component="p" marginLeft={1}>
                                {myBooking.hours}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "7px"
                            }}
                        >
                            <Description style={{ width: 15 }} />
                            <Typography variant="subtitle1" component="p" marginLeft={1}>
                                {myBooking.description}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            padding: 2,
                            marginLeft: 2,
                            justifyContent: "center", 
                            display: "flex",
                            }}
                            >
                            <Button variant="contained" size='medium'color="error" onClick={() => {console.log('booking id in button:', listingID); deleteBooking(listingID)}}>Cancel</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={4}>
                            <GoogleMapApi latLng={latLng}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Footer />
        </div>
    )
}

export default ConfirmedBooking;