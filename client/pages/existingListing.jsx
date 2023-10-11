import {
    Box,
    Typography,
    Container,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import '../src/styles.css'
  import React from "react";


  const ExistingListing = () => {
    
    return (
        <Container sx={{alignItems:'left'}}>
            <Grid container spacing={2}>
                <Grid sx={{lg:6, height:'100%', width: '50%'}}>
                    <Box sx={{
                    }}
                    >
                    <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid sx={{lg:6, height:'90vh', width: '50%'}}>
                    <Box sx={{
                        border: 1,
                        height: '100%'
                    }}
                    >
                        <Typography>Details Here</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
  }

  export default ExistingListing;