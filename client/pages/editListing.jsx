import Navbar from "../components/navbar.jsx"
import {
    Box,
    TextField,
    Button,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import React, { useContext, useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  


  const EditListing = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const editedListing = {
            name: data.get('name'),
            address: data.get('address'),
            city: data.get('city'),
            state: data.get('state'),
            zipcode: data.get('zipcode'),
            hours: data.get('hours'),
            rate: data.get('rate'),
            description: data.get('description')
          };

        const listingUpdate = {
            listingID: location.state.userListing.listingid,
            name: location.state.userListing.name,
            address: location.state.userListing.address,
            city: location.state.userListing.city,
            state: location.state.userListing.state,
            zipcode: location.state.userListing.zipcode,
            hours: location.state.userListing.hours,
            rate: location.state.userListing.rate,
            description: location.state.userListing.description
        }

        console.log(location.state.userListing);

          for (let key in editedListing) {
            if (editedListing[key] != null && editedListing[key] != "") listingUpdate[key] = editedListing[key]
          }

          console.log(listingUpdate);

          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listingUpdate)
          }

          fetch('/home/update-listing', options)
            .then(navigate('/existing-listing'))


  
      };


    return (
        <Grid container spacing={2}>
            <Grid sx={{lg:6, height:'100%', width: '50%', mt:5}}>
                <Box sx={{ ml: 3}}>
                <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" width={'100%'} height={'100%'} />
                </Box>
            </Grid>
            <Grid sx={{lg:6, height:'90vh', width: '50%', mt:3, mb: 8, alignItems:"left"}}>
                <Box component="form" noValidate onSubmit={handleSubmit}
                sx={{
                    height: '100%',
                    mr: 3,
                }}
                >
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label={location.state.userListing.name}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="address"
                      name="address"
                      label={location.state.userListing.address}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="city"
                      name="city"
                      label={location.state.userListing.city}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="state"
                      name="state"
                      label={location.state.userListing.state}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="zipcode"
                      name="zipcode"
                      label={location.state.userListing.zipcode}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="country"
                      name="country"
                      label={location.state.userListing.country}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="rate"
                      name="rate"
                      label={location.state.userListing.rate}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label={location.state.userListing.description}
                      margin="normal"
                    />
            <Button variant="contained" type="submit" sx={{mr:3, mt: 2}} >Save Changes</Button><Button variant="contained" sx={{mr:3, mt:2}} onClick={() => navigate('/existing-listing')}>Cancel</Button>
                </Box>
            </Grid>
        </Grid>
  )};

  export default EditListing;