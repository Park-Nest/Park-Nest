import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import {
    Box,
    TextField,
    Button,
  } from "@mui/material";
  import Grid from '@mui/system/Unstable_Grid';
  import React, { useContext, useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState.js";
  


  const EditListing = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(GlobalContext);
    let allListings = context.userListings;

    const [returnid, setreturnid] = useState(location.state.userListing.listingid);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(document.getElementById("form"));
        const editedListing = {
            name: data.get('name'),
            address: data.get('address'),
            city: data.get('city'),
            state: data.get('state'),
            zipcode: data.get('zipcode'),
            country: data.get('country'),
            hours: data.get('hours'),
            rate: data.get('rate'),
            description: data.get('description')
          };

        const listingUpdate = {
            listingid: location.state.userListing.listingid,
            name: location.state.userListing.name,
            address: location.state.userListing.address,
            city: location.state.userListing.city,
            state: location.state.userListing.state,
            zipcode: location.state.userListing.zipcode,
            country: location.state.userListing.country,
            hours: location.state.userListing.hours,
            rate: location.state.userListing.rate,
            description: location.state.userListing.description,
            photo: location.state.userListing.photo
        }

        allListings.forEach((el) => {
          if (el.listingid === location.state.userListing.listingid) {
            el = location.state.userLisitng
          }
        });

          for (let key in editedListing) {
            if (editedListing[key] != null && editedListing[key] != "") listingUpdate[key] = editedListing[key]
          }

          const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listingUpdate)
          }

          fetch('/home/update-listing', options)
            .then(() => navigate('/existing-listing', {state: {id: returnid}}))
  
      };


    return (
      <div>
        <Navbar />
        <Grid container spacing={2}>
            <Grid sx={{lg:6, height:'10vh', width: '50%', mt:5}}>
                <Box sx={{ ml: 3}}>
                <img src={location.state.userListing.photo} width={'100%'} height={'100%'} />
                </Box>
            </Grid>
            <Grid sx={{lg:6, height:'10vh', width: '50%', mt:3, mb: 8, alignItems:"left"}}>
                <Box component="form" id="form" noValidate onSubmit={handleSubmit}
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
            <Button variant="contained" type="submit" sx={{mr:3, mt: 2, mb: 3}} onClick={handleSubmit}>Save Changes</Button><Button variant="contained" sx={{mr:3, mt:2,mb: 3}} onClick={() => navigate('/existing-listing', {state: {id: returnid}})}>Cancel</Button>
                </Box>
            </Grid>
        </Grid>
        <div>
        <Footer />
        </div>
    </div>    
  )};

  export default EditListing;