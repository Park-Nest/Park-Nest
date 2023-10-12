import {
    Paper,
    Link,
    Button,
    Typography,
    Container,
    Box,
  } from "@mui/material";
import { blue } from '@mui/material/colors';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer.jsx"



  const Landing = () => {

    const navigate = useNavigate();

    return (
    <div>
      <Paper sx={{backgroundImage: 'url("https://www.picturecorrect.com/wp-content/uploads/2015/11/traffic-night.jpg")',
      backgroundSize: '100%'}} >
        <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        heigth: '100%',
        alignItems:  'center',
        height: '100vh',
        }}>

        {/* <Box sx={{
        display:"flex",
        mt: '5%',
        border: 1,
        bgcolor: "white",
        width: '100vh',
        height: '40vh',
        borderColor:  'common.black',
        justifyContent:  'center',
        alignItems:  'center',
    }}
        > */}
       <Typography variant="h4" component='h2' marginTop='5%' padding="5%" color="common.white">
        Welcome to Park Nest! </Typography>
        <Typography variant="h4" component='h2' color="common.white">
        <Link href='/login' color="common.white" variant="h4">Log In</Link> or <Link href='/signup' color="common.white">Sign Up</Link> to find your space today.
        </Typography>
{/*        
        </Box> */}
        </Container>
        </Paper>
        <Footer/>
    </div>
    )
  }

  export default Landing;