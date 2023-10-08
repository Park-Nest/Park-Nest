const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./model/model');
require('dotenv').config();
const apiRouter = require('./routes/api.js')

//handle request bodies
app.use(express.json());
//handle cookies
app.use(cookieParser());

//npm start - serves index.html:
if (process.env.NODE_ENV === 'production'){
    //statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build/')));
    // serve index.html on the route '/'
app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
    })
}

//Routes
// app.use('/home', apiRouter)

app.get('/home/getUser', (req, res) => {
  const text = 'SELECT * FROM users;'
  db.query(text).then((data) => {
      console.log(data.rows)
      res.json(data.rows[0].name)
  })
})

//get listings for Derek, add to Jesse's api route handler
app.get('/home/getListings', (req, res) => {
    //replace userid value after authorization is ready
    const text = 'SELECT * FROM listings WHERE userid=1;'
    db.query(text).then((data) => {
        res.json(data.rows)
    })
  })

//get bookings for Derek, add to Jesse's api route handler
app.get('/home/getBookings', (req, res) => {
    //replace userid value after authorization is ready
    const text = 'SELECT listings.* FROM bookings JOIN listings ON listings.listingID = bookings.listingID WHERE bookings.userid=1;'
    db.query(text).then((data) => {
        res.json(data.rows)
    })
})

//Page Not Found
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
})

//Global Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'unknown error handler caught in middleware',
        status: 400,
        message: {err: 'An error occured'},
  }
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).send(errorObj.message); 
})

//Listening on port 3000
app.listen(3000, () => {console.log(`Listening on port 3000...`)});

//export app
module.exports = app;