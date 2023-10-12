import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
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
    // const listingid = location.state.Listingid;
    // const listingid = 3;
    // const context = useContext(GlobalContext);
    // const allListings = context.UserListings;
    // const allBookings = context.UserBookings;
    let userListing = {};
    let allBookings = [{listingid: 3, name: 'Dane\'s space'}];

    // allListings.forEach((el) => {
    //     if (listingid === el.listingid) userListing = el
    // })


    userListing = {
        listingid: 3,
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

    
    const handleClick = () => {

      allBookings.forEach((el) => {
        if (userListing.listingid === el.listingid) return alert(`Unable to remove ${el.name}: this space has an upcoming booking. Please wait to remove your listing until all bookings have expired.`)
      });

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({listingid: userListing.listingid})
      };
    
      fetch('/home/remove-listing', options)
      .then(navigate('/existing-listing'))
      .catch(err => console.log('Unable to remove listing'))

    };

    
    return (
        <div>
        <Navbar />
            <Grid container spacing={2}>
                <Grid sx={{lg:6, height: '5vh', width: '50%', mt:5}}>
                    <Box sx={{ ml: 3}}>
                    <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid sx={{lg:6, height: '5vh', width: '50%', mt:3, mb: 8, alignItems:"left"}}>
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
                        >Edit Listing</Button><Button variant="contained" sx={{mr:3, mt: 5}} onClick={handleClick}>Remove Listing</Button>
                    </Box>
                </Grid> 
                </Grid>
                <Footer />
                </div>
    )
  }

  export default ExistingListing;


