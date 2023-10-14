const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./model/model');
require('dotenv').config();
const apiRouter = require('./routes/api.js')
const listingsController = require('./controller/listingsController.js');


// enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: true }));
//handle request bodies
app.use(express.json());
//handle JSON req objects for multiple parameters in form data. 
app.use(bodyParser.json());
//handle cookies
app.use(cookieParser());
//npm start - serves index.html:
if (process.env.NODE_ENV === 'production') {
    //statically serve everything in the build folder on the route '/build'
    app.use('/build', express.static(path.join(__dirname, '../build/')));
    // serve index.html on the route '/'
    app.get('/', (req, res) => {
      return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    })
}

//Routes
// app.use('/home', apiRouter)

//listingBookingRouter
    //User makes a choice to which spot they want to book - get requests sends to listing booking page. 
    //When spot is chosen and button is clicked - Post requests book spot. 
    //Uppdate database for their listings and anyother data that needs to be updated. 

app.get('/listing-booking/:listingid', (req, res) => {
    //listingid above will be a number
    let listingid = req.params.listingid;
    const text = `SELECT * FROM listings WHERE listingid=${listingid}`;
        db.query(text).then((data)=> {
            console.log(data.rows);
            res.status(200).json(data.rows[0].listingid);
        })
    });


//post request to insert data.
app.post('/listing-Booking/:listingid/:userid', (req, res) => {
    // Extract parameters from the URL
    const listingid = req.params.listingid;
    const userid = req.params.userid;
  
    // Call the controller function and pass the parameters
    listingsController.bookListing(req, res, listingid, userid);
  });

//gets specific user from database. 
app.get('/home/getUser', (req, res) => {
  const text = 'SELECT * FROM users;'
  db.query(text).then((data) => {
      console.log(data.rows)
      res.json(data.rows[0].name)
  })
})

// requests for static files
app.use(express.static(path.resolve(__dirname, '../client')))

// ROUTE HANDLER (Routes are defined in api.js)
app.use('/home', apiRouter)

//Page Not Found
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
})

//Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  const defaultErr = {
    log: 'unknown error handler caught in middleware',
    status: 400,
    message: {err: 'An error occured'},
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).send(errorObj.message); 
})

//Listening on port 3000
app.listen(process.env.PORT, () => {console.log(`Listening on port 3000...`)});

//export app
module.exports = app;