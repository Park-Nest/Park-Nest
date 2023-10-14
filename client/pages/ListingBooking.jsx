import React, { useContext, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import '../src/styles.css';
import { GlobalContext } from "../context/GlobalState";

const ListingBooking = () => {
//Bring in the current state of the app. 
const context = useContext(GlobalContext);
const location = useLocation();
const navigate = useNavigate();

  //upon rendering of the page, does a get request to retrieve the selected data for the parking spots. 
 //create a button submit function 
  //upon event 
    //inserts booking into listings database 
      //submits the information via middleware 
//Grabs the current user who is looking at the listing. 
    function getUser() {
        fetch('/home/getUser')
          .then((data) => data.json())
          .then((data) => context.setAllListings(data));
      }

  
      useEffect(getUser, []);

      function getListing() {
        
      }

  const items = ["NAME", "ADDRESS", " HOURS", "RATE","OWNER", "DESCRIPTION", "AVAILABLE", "PHOTO" ];
  //Temporary Styling for the Listing
  const listItemStyles = {
    fontSize: '30px',  // Increase the font size
    padding: '10px',   // Add padding to increase item size
  };

  //click functionality of the button ----> Let's user know listing has been booked and kicks back to profile
  const handleNavigation = () => {
    // Use the navigate function to go to a specific route
    alert('Are you sure you would like to book!')
    navigate('/profile');
    //--> /InsertListing Route Here. Once clicked will create a new listing to post to the profile pick
  };


//add functionality of grabbing listing data from the Home listing page. This will be data that will be inserting into the database. 
//Add the picture from the listing to the left of the page. 

  return (
    <Box
    display="flex"
    justifyContent="flex-start" // Position the content to the left
    alignItems="center"
    height="100vh"
  >
    <img
      src="your-large-image-url.jpg"
      alt="Large Image Description"
      style={{ width: '40%', height: '80vh' }}
    />
    <Box
      sx={{
        width: '60%', // 60% of the viewport width
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2rem',
        borderRadius: '20px',
        marginTop: '20px',
        marginBottom: '50px',
      }}
    >
      <div>
        <h1>{context.allListings} Booking info</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index} style={listItemStyles}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={handleNavigation}
        variant="contained"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          width: '80%',
          height: '80px',
        }}
      >
        Book Parking Spot Now
      </Button>
    </Box>
  </Box>
  )
};

export default ListingBooking;