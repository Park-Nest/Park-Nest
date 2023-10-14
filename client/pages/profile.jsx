import SpotCard from "../components/spot-card.jsx";
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import '../styles/styles.css'
import {
    Grid,
    Container,
    Typography,
    Button
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.js";


const Profile = () => {

    const context = useContext(GlobalContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      verifyJwt()
    }, [])

    const verifyJwt = () => {
      fetch('/home/verify-jwt')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          // Handle the data here, set redirect based on data if needed
          if (data === false) {
            navigate('/login');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };
    

    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        fetch('/home/getListings')
            .then(res => res.json())
            .then(res => context.setUserListings(res))
            .catch(err => console.log('error: failed to retrieve listings'))

        fetch('/home/getBookings')
            .then(res => res.json())
            .then(res => context.setUserBookings(res))
            .catch(err => console.log('error: failed to retrieve bookings'))


        setLoading(false)
    };

    if (loading) {
        return <div>Loading...</div>
    }

    else {
        const userListings = context.userListings.map((booking) => {
            return <SpotCard key={booking.listingid} listingid={booking.listingid} name={booking.name} address={booking.address} rate={booking.rate} hours={booking.hours} photo={booking.photo} edit='/existing-listing' buttontype='Details'/>
        })

        const userBookings = context.userBookings.map((booking) => {
            return <SpotCard key={booking.listingid} listingid={booking.listingid} name={booking.name} address={booking.address} rate={booking.rate} hours={booking.hours} photo={booking.photo} edit='/confirmed-booking' buttontype='Edit' />
        })

        return (
            <div>
                <Navbar />
                <Container sx={{ marginY: 5 }}>
                    <Grid>
                        <Typography variant="h2" component="h1" marginTop={5} marginBottom={3} sx={{ textAlign: "center" }}>
                            Welcome User!
                        </Typography>
                    </Grid>
                    <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                        Bookings
                    </Typography>
                    <Grid container spacing={8}>
                        {userBookings}
                        <Button sx={{ marginX: 5, marginY: 15 }} variant='contained' onClick={() => navigate('/search')}>
                            New Booking
                        </Button>
                    </Grid>
                    <Typography variant="h4" component='h2' marginTop={5} marginBottom={3}>
                        Listings
                    </Typography>
                    <Grid container spacing={8}>
                        {userListings}
                        <Button sx={{ marginX: 5, marginY: 15 }} variant='contained' onClick={() => navigate('/listing-creation')}>
                            New Listing
                        </Button>
                    </Grid>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Profile;
