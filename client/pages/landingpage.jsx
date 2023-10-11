import {
    Button,
    Typography,
    Container,
    Box,
  } from "@mui/material";
import { blue } from '@mui/material/colors';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



  const Landing = () => {

    const navigate = useNavigate();

    const blueColor = blue[100]

    return (
        <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        heigth: '100%',
        justifyContent:  'center',
        alignItems:  'center',
        }}>

        <Typography variant="h4" component='h2' marginTop='5%'>
        Welcome to Park Nest!
        </Typography>

        <Box sx={{
        display: 'flex',
        mt: '5%',
        border: 1,
        bgcolor: blueColor,
        width: '25%',
        heigth: '100%',
        borderColor:  'primary.main',
        justifyContent:  'center',
        alignItems:  'center',
    }}
        >
        <Button sx={{
           mr: '5%', mt:'20%', mb: "20%"}} variant="contained" onClick={() => {navigate("/login")}}>Login</Button> <Button sx={{ml: '5%', mt:'20%', mb: "20%"}} variant="contained" onClick={() => navigate("/signup")}>Signup</Button>
        </Box>

        </Container>
    )
  }

  export default Landing;