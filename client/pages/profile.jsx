import SpotCard from "../components/spot-card.jsx";
import '../src/styles.css'
import {
    Grid,
    Container,
    Typography,
    Button
  } from "@mui/material";
import React from "react";

const Profile = () => {
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