import SpotCard from "../components/spot-card.jsx";
import '../src/styles.css'
import {
    Grid,
    Container,
    Typography,
    Button
  } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.js";

const Profile = () => {
    const context = useContext(GlobalContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/home/getListings')
            .then(res => res.json())
            .then(res => context.setUserListings(res))
            .catch(err => console.log('error: failed to retrieve listings'))

        fetch('/home/getBookings')
            .then(res => res.json())
            .then(res => context.setUserBookings(res))
            .catch(err => console.log('error: failed to retrieve bookings'))
    }, [])

    const userBookings = context.userBookings.map((booking) => {
        return <SpotCard listingid={booking.listingid} name={booking.name} address={booking.address} rate={booking.rate} hours={booking.hours} photo={booking.photo} edit='/confirmed-booking'/>
    })

    const userListings = context.userListings.map((booking) => {
        return <SpotCard listingid={booking.listingid} name={booking.name} address={booking.address} rate={booking.rate} hours={booking.hours} photo={booking.photo} edit='/existing-listing'/>
    })

    return (
        <Container sx={{marginY: 5}}>
            <Grid>
                <Typography variant="h2" component="h1" marginTop={5} marginBottom={3} sx={{textAlign: "center"}}>
                    Welcome User!
                </Typography>
            </Grid>
            <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                Bookings
            </Typography>
            <Grid container spacing={5}>
                {userBookings}
                <Button sx={{marginX: 5, marginY: 15}} variant='contained' onClick={() => navigate('/')}>
                    New Booking
                </Button>
            </Grid>
            <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                Listings
            </Typography>
            <Grid container spacing={5}>
                {userListings}
                <Button sx={{marginX: 5, marginY: 15}} variant='contained' onClick={() => navigate('/listing-creation')}>
                    New Listing
                </Button>
            </Grid>
        </Container>
      );
}

export default Profile;

// function fetchUser() {
    //   fetch('/home/getUser')
    //     .then((data) => data.json())
    //     .then((data) => context.setAllListings(data))
    // }