import React, { useEffect, useContext, useLocation } from "react";
import { Container, Grid, Typography, Button } from "@mui/material"
import { GlobalContext } from "../context/GlobalState.js";

const ConfirmedBooking = () => {
    const location = useLocation();
    const context = useContext(GlobalContext);
    let userBookings = context.userBookings;
    let bookingID = location.state.bookingID
    let myBooking = {};

    userBookings.forEach((booking) => {
        if (booking.bookingid === bookingID) myBooking = booking;
    })
    
    


    return(
        <Container sx={{marginY: 5}}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={4}>
                        <img src={myBooking.photo} alt="parking spot" className="one-spot"/>
                        <Box sx={{paddingX: 1}}>
                            
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={4}>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ConfirmedBooking;