import {
    Box,
    Typography,
    Container,
    Button,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import React, { useContext } from "react";
  import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
  import { GlobalContext } from "../context/GlobalState.js";
  import { useLocation } from "react-router-dom";



  const ExistingListing = () => {

    // let theme = createTheme();
    // theme = responsiveFontSizes(theme); 


    // const location = useLocation();
    // const listingID = location.state.ListingID;
    // const context = useContext(GlobalContext);
    // const allListings = context.userListings;
    // const userListing = {};

    // allListings.forEach((e) => {
    //     if (listingID === e.ListingID) userListing = e
    // }); 

    

    
    return (
        <Container sx={{alignItems:'left'}}>
            <Grid container spacing={2}>
                <Grid sx={{lg:6, height:'100%', width: '50%', mt:3}}>
                    <Box sx={{
                    }}
                    >
                    <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                {/* <Grid sx={{lg:6, height:'90vh', width: '50%', mt:3, mb: 8}}>
                    <Box sx={{
                        border: 1,
                        height: '100%'
                    }}
                    >
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}>
                        <Typography variant="h4" component="h1" marginTop={1} marginBottom={0} sx={{textAlign: "center"}}>{userListing.name}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}>
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.address}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}> 
                        <ThemeProvider theme={theme}>   
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.city}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}> 
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.state}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}> 
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.zipCode}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}> 
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.hours}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}> 
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.rate}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display="flex" alignContent={'left'} alignItems={'left'}>
                        <ThemeProvider theme={theme}> 
                        <Typography variant="h4" component="h1" marginTop={5} marginBottom={0} sx={{textAlign: "center"}}>{userListing.description}</Typography>
                        </ThemeProvider>
                    </Box>
                    <Box display='flex' justifyContent={'flex-end'}>
                        <Button variant="contained" sx={{mr:3, mt: 5}}>Edit Listing</Button><Button variant="contained" sx={{mr:3, mt:5}}>Save Changes</Button>
                    </Box>
                    </Box>
                </Grid> */}
            </Grid>
        </Container>
    )
  }

  export default ExistingListing;


