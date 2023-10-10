import SpotCard from "../components/spot-card.jsx";
import '../styles/styles.css'
import {
    Grid,
    Container,
    Typography,
    Button
  } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState.js";

const Profile = () => {

    // const context = useContext(GlobalContext);

    // function fetchUser() {
    //   fetch('/home/getUser')
    //     .then((data) => data.json())
    //     .then((data) => context.setAllListings(data))
    // }

    // useEffect(fetchUser, [])

    return (
        <Container sx={{marginY: 5}}>
            <Grid>
                <Typography variant="h2" component="h1" marginTop={5} marginBottom={3} sx={{textAlign: "center"}}>
                    Welcome {context.allListings}!
                </Typography>
            </Grid>
            <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                Bookings
            </Typography>
            <Grid container spacing={5}>
                <SpotCard />
                <SpotCard />
                <Button sx={{margin: 5}}>
                    New Booking
                </Button>
            </Grid>
            <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                Listings
            </Typography>
            <Grid container spacing={5}>
                <SpotCard />
                <SpotCard />
                <Button sx={{margin: 5}}>
                    New Listing
                </Button>
            </Grid>
        </Container>
      );
}

export default Profile;