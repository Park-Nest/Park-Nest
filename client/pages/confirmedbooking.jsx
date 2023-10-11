import React, { useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Grid, Typography, Paper, Box, Button } from "@mui/material"
import { GlobalContext } from "../context/GlobalState.js";
import { AttachMoney, AccessTime, Map, Description } from "@mui/icons-material";
import { setDefaults, fromAddress } from "react-geocode";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

const ConfirmedBooking = () => {
    const location = useLocation();
    const context = useContext(GlobalContext);
    const navigate = useNavigate();
    //all user bookings - global user bookings state
    let userBookings = context.userBookings;
    //passed in bookingID #
    let bookingID = location.state.bookingID
    //passed in booking details via bookingID passed in and global state (currently loses data after page refresh)
    let myBooking = useRef({})
    //find the booking that has the passed in ID 
    userBookings.forEach((booking) => {
        if (booking.bookingid === bookingID) myBooking.current = booking;
    })
    console.log(myBooking)

    let myBookingLatLong = {}
    
    // setDefaults({
    //     key: process.env.GOOGLE_API,
    //     language: "en",
    //     region: "es"
    // })

    // fromAddress(`${myBooking.current.address + myBooking.current.address + myBooking.current.state}`)
    //     .then(({ results }) => {
    //         const { lat, lng } = results[0].geometry.location;
    //         myBookingLatLong = {lat: lat, lng: lng}
    //     })
    //     .catch(console.err)
    
    const deleteBooking = (bookingID) => {
        fetch('', {
            method: 'DELETE',
            body: JSON.stringify({bookingID: bookingID})
        }).then(() => {
            alert('Booking Deleted!')
            navigate('/Profile')
        })
    }
    
    return(
        <div>
        <Navbar />
        <Container sx={{marginY: 5}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={4}>
                        <img src={myBooking.current.photo} alt="parking spot" className="one-spot"/>
                        <Box sx={{paddingX: 1}}>
                            <Typography variant="h4" component="h2">
                                {myBooking.current.name}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "5px"
                            }}
                        >
                            <Map style={{ width: 15 }} />
                            <Typography variant="h6" component="p" marginLeft={1}>
                                {myBooking.current.address}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "5px",
                            marginTop: "5px"
                            }}
                        >
                            <AttachMoney style={{ width: 15 }} />
                            <Typography variant="h6" component="p" marginLeft={1}>
                                ${myBooking.current.rate}/Hour
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "5px"
                            }}
                        >
                            <AccessTime style={{ width: 15 }} />
                            <Typography variant="h6" component="p" marginLeft={1}>
                                {myBooking.current.hours}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "7px",
                            marginTop: "5px"
                            }}
                        >
                            <Description style={{ width: 15 }} />
                            <Typography variant="h6" component="p" marginLeft={1}>
                                {myBooking.current.description}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                            display: "flex",
                            padding: 1,
                            marginLeft: 2
                            }}
                            >
                            <Button variant="contained" size='medium'color="error" onClick={() => deleteBooking()}>Cancel</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={4}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
        <Footer />
        </div>
    )
}

export default ConfirmedBooking;