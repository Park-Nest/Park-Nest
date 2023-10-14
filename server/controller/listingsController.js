const express = require('express');
const db = require('../model/model');
require('dotenv').config();
const cookieParser = require('cookie-parser');


listingsController = {};

listingsController.bookListing = (req, res, listingid, userid) => {
   // Insert a query into the database.
   const userText = `SELECT * FROM users WHERE user=${userid}`;
   // Insert into the bookings table based on the userid and listingid.
   const insertionText = `INSERT INTO bookings (userid, listingid) VALUES (${userid}, ${listingid})`;
   
   db.query(insertionText)
     .then((data) => {
       console.log(data.rows);
       res.status(200).json('Booking successful');
     })
     .catch((error) => {
       console.error(error);
       // Handle errors and possibly send an error response.
       res.status(500).json('Booking failed');
     });
};


module.exports = listingsController; 