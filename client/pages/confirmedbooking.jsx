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
    const [listingID, setListingID] = useState()
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const location = useLocation();
    const context = useContext(GlobalContext);
    const navigate = useNavigate();

    let passedInID = location.state.id;
    let userBookings = context.userBookings;
    let myBooking = useRef({})

    userBookings.forEach((booking) => {
        if (booking.listingid === passedInID) myBooking.current = booking;
    })

    useEffect(() => {
        //Google Geocoder - get lat/long from address
        setDefaults({
            key: ,
            language: "en",
            region: "es"
        })
        fromAddress(`${myBooking.current.address + ' ' + myBooking.current.city + ' ' + myBooking.current.state}`)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                setLat(lat);
                setLng(lng);
            })
            .catch(console.err)
        
        //Set listingID so it can be deleted from Bookings table (passed to cancel button)
        setListingID(passedInID)

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
                        <img src={myBooking.current.photo} alt="parking spot" className="one-spot"/>
                        <Box sx={{paddingX: 1, justifyContent: "center", display: "flex",}}>
                            <Typography variant="h4" component="h2">
                                {myBooking.current.name}
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
                                {myBooking.current.address}
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
                                ${myBooking.current.rate}/Hour
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
                                {myBooking.current.hours}
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
                                {myBooking.current.description}
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
                            <GoogleMapApi myLat={lat} myLng={lng}/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Footer />
        </div>
    )
}

export default ConfirmedBooking;