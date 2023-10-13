import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import {
    Container,
    Box,
    Typography,
    Button,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import React, { useContext, useState, useEffect } from "react";
  import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
  import { GlobalContext } from "../context/GlobalState.js";
  import { redirect, useNavigate, useLocation} from "react-router-dom";


  const ExistingListing = () => {

  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const location = useLocation();
  const listingid = location.state.id;
  console.log(listingid)
    
    useEffect(() => {
        getUserInfo()
    }, [])

    const getUserInfo = () => {
        fetch('/home/getListings')
            .then(res => res.json())
            .then(res => context.setUserListings(res))
            .then(() => setLoading(false))
            .catch(err => console.log('error: failed to retrieve listings'))

        fetch('/home/getBookings')
            .then(res => res.json())
            .then(res => context.setUserBookings(res))
            .catch(err => console.log('error: failed to retrieve bookings')) 


    };

    if (loading){
        return <div>Loading...</div>
    }
    
    else {

  // create text theme with new font
      const theme = createTheme({
        typography: {
        fontFamily: [
          'Manrope',
          'light',
        ].join(','),
        },});
  // make text size responsive 
      const responsiveTheme = responsiveFontSizes(theme)

      const allBookings = context.userBookings;
      let allListings = context.userListings;
      let userListing = {};

  // set userListing as the selected listing
        allListings.forEach((el) => {
          if (listingid === el.listingid) userListing = el
        })

        console.log(userListing.photo)
    
      const handleClick = () => {

      let failed = false;

      console.log(allBookings)

  // check whether this listing has a current booking and alert user that listings with a current booking can't be removed
      allBookings.forEach((el) => {
        if (userListing.listingid === el.listingid) {
            alert(`Unable to remove ${el.name}: this space has an upcoming booking. Please wait to remove your listing until all bookings have expired.`)
            failed = true;
        }
      });

      if (failed) return navigate('/existing-listing', {state: {id: userListing.listingid}});

    //   const options = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({listingid: userListing.listingid})
    //   };
    
    //   fetch('/home/remove-listing', options)
    //   .then(navigate('/profile'))
    //   .catch(err => console.log('Unable to remove listing'))

    };

    return (
        <div>
        <Navbar />
            <Grid container spacing={2}>
                <Grid sx={{lg:6, height: '5vh', width: '50%', mt:5}}>
                    <Box sx={{ ml: 3}}>
                    <img src={userListing.photo} width={'100%'} height={'100%'} />
                    </Box>
                </Grid>
                <Grid sx={{height:'10vh', width: '50%', lg:6, mt:3, mb: 8, alignItems:"right"}}>
                    <Box sx={{
                        mr: 3,
                        mb: 10,
                    }}
                    >
                        <ThemeProvider theme={responsiveTheme}>
                        <Typography variant="h4" marginTop={1} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.name}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.address}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.city}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.state}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.zipcode}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.country}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.hours}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.rate}</Typography>
                        <Typography variant="h4" component="h1" marginTop={3} marginBottom={0} sx={{textAlign: "left", ml: 2}}>{userListing.description}</Typography>
                        </ThemeProvider>
                        <Button variant="contained" sx={{mr:3, mt: 5}} onClick={() => navigate('/edit-listing', { state: {userListing}, replace:true,})}
                        >Edit Listing</Button><Button variant="contained" sx={{mr:3, mt: 5}} onClick={handleClick}>Remove Listing</Button>
                    </Box>  
                </Grid>
                </Grid>
                <Footer/>
                </div>
    )
  }
}

  export default ExistingListing;


