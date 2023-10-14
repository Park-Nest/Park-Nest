import {
    Paper,
    Link,
    Button,
    Typography,
    Container,
    Box,
  } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer2 from "../components/footer2.jsx"
import '../styles/styles.css'
import { createTheme, ThemeProvider } from '@mui/material';



  const Landing = () => {

    const navigate = useNavigate();

    const boldTheme = createTheme({
        typography: {
          fontFamily: [
            'Ubuntu',
            'bold',
          ].join(','),
        },});

    const theme = createTheme({
        typography: {
          fontFamily: [
            'Ubuntu',
            'regular',
          ].join(','),
        },});

    return (
    <div>
      <Paper sx={{backgroundImage: 'url("https://www.picturecorrect.com/wp-content/uploads/2015/11/traffic-night.jpg")',
      backgroundSize: '100%'}} >


        <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '10%',
        alignItems:  'left',
        }}
        >

        <ThemeProvider theme={boldTheme}>
          <Typography variant="h2" component='h2' marginTop="2%" marginLeft="2%" color="common.white">Park Nest</Typography>
        </ThemeProvider>
        
        </Box>
  

        <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems:  'center',
        height: '100vh',
        }}>

        <Box sx={{
        display: 'flex',
        mt: '20vh',
        border: 4,
        borderColor: "common.white",
        width: '65%',
        height: '18%',
        padding: '3px',
        justifyContent: 'center',
        alignItems:'center',
        bgcolor: 'common.black'
    }}
        >

        <ThemeProvider theme={theme}>
        <Typography variant="h4" component='h2' color="common.white" marginTop="10%" marginBottom="10%">
        <Link href='/login' color="common.white" variant="h4">Log In</Link> or <Link href='/signup' color="common.white">Sign Up</Link> to find your space today.
        </Typography>
        </ThemeProvider>
       
        </Box>
        </Container>
        <div>
        <Footer2/>
        </div>
        </Paper>
    </div>
    )
  }

  export default Landing;