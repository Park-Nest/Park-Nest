import Navbar from "../components/navbar.jsx"
import {
    Box,
    Typography,
    Button,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import React, { useContext } from "react";
  import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
  import { GlobalContext } from "../context/GlobalState.js";
  import { useNavigate } from "react-router-dom";



  const ExistingListing = () => {

    let theme = createTheme();
    theme = responsiveFontSizes(theme); 
    const navigate = useNavigate();


    // const location = useLocation();
    // const listingID = location.state.ListingID;
    // const listingID = 3;
    // const context = useContext(GlobalContext);
    // const allListings = context.userListings;
    let userListing = {};

    // allListings.forEach((el) => {
    //     if (listingID === e.ListingID) userListing = el
    // })


        userListing = {
            listingID: 12345,
            name: "Test Name", 
            address: "123 Road Name", 
            city: "Lander", 
            state: "Wyoming",
            zipcode: 82520,
            country: 'USA',
            hours: "9 a.m. - 5 p.m.",
            rate: "$10/hr",
            description: "This is a parking spot that is available for rent."
        }

    
    return (
            <Grid container spacing={2}>
                <Grid sx={{lg:6, height:'100%', width: '50%', mt:5}}>
                    <Box sx={{ ml: 3}}>
                    <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid sx={{lg:6, height:'90vh', width: '50%', mt:3, mb: 8, alignItems:"left"}}>
                    <Box sx={{
                        height: '100%',
                        mr: 3,
                    }}
                    >
                        <ThemeProvider theme={theme}>
                        <Typography variant="h5" component="h1" marginTop={1} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.name}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.address}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.city}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.state}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.zipcode}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.country}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.hours}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.rate}</Typography>
                        <Typography variant="h5" component="h1" marginTop={4} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.description}</Typography>
                        </ThemeProvider>
                        <Button variant="contained" sx={{mr:3, mt: 5}} onClick={() => navigate('/edit-listing', { state: {userListing}, replace:true,})}
                        >Edit Listing</Button>
                    </Box>
                </Grid> 
                </Grid>
    )
  }

  export default ExistingListing;


