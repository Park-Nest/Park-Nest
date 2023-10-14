
import SpotCard from "../components/spot-card.jsx";
import GoogleMapApi from "../components/googlemapswrapper.jsx";
import Navbar from "../components/navbar.jsx"
import Footer from "../components/footer.jsx"
import '../styles/styles.css'
import {
    CircularProgress,
    Grid,
    Container,
    Paper,
  } from "@mui/material";
import { setDefaults, fromAddress } from "react-geocode";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState.js";

const Search = () => {
    const context = useContext(GlobalContext);
    const [latLng, setLatLng] = useState([])
    const [loading, setLoading] = useState(true)
    //const [allListings, setAllListings] = useState({})

    useEffect(() => {
        fetch('/home/getAllListings')
        .then(res => res.json())
        .then((res) => {
            context.setAllListings(res)
            setLoading(false)
        })
        .catch(err => console.log('error: failed to retrieve listings'))
    }, [])

    useEffect(() => {
        let location = []
        setDefaults({
            key: process.env.REACT_APP_GOOGLE_API,
            language: "en",
            region: "es"
        })
        context.allListings.forEach((listing) => {
            fromAddress(`${listing.address + ' ' + listing.city + ' ' + listing.state}`)
            .then(({ results }) => {
                const { lat, lng } = results[0].geometry.location;
                location.push({lat: lat, lng: lng})
            })
            .catch(console.err)
        })
        setLatLng(location)
    }, [loading])

    const allListings = context.allListings.map((listing) => {
        return <SpotCard key={listing.listingid} listingid={listing.listingid} name={listing.name} address={listing.address} rate={listing.rate} hours={listing.hours} photo={listing.photo} edit='/listing-booking'/>
    })
    
    console.log('latlong before render', latLng)

    if (loading){
        return <CircularProgress />
    }

    return (
        <div>
            <Navbar />
            <Container sx={{marginY: 5}}>
                <Grid container spacing ={3}>
                    <Grid item xs={6}>
                            <Grid container spacing={3}>
                                {allListings}
                            </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={4}>
                            <GoogleMapApi latLng={latLng} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    )
}

export default Search;