const express = require('express');
const router = express.Router();
const db = require('../model/model');

router.get('/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows[0].name)
    }).catch((err) => {
        console.log('error getting user')
    })
})

router.get('/getListings', (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's listings
    const text = 'SELECT * FROM listings WHERE userid=1;'
    db.query(text).then((data) => {
        res.status(200).json(data.rows)
    }).catch((err) => {
        console.log('error getting listings')
    })
  })

router.get('/getBookings', (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's Bookings
    const text = 'SELECT listings.* FROM bookings JOIN listings ON listings.listingID = bookings.listingID WHERE bookings.userid=1;'
    db.query(text).then((data) => {
        res.status(200).json(data.rows)
    }).catch((err) => {
        console.log('error getting bookings')
    })
})

router.delete('/deleteBooking', (req, res) => {
    const text = 'DELETE FROM bookings WHERE listingid=$1';
    const values = [req.body.id]
    db.query(text, values).then(data => {
        res.sendStatus(200).json('booking deleted')
    }).catch((err) => {
        console.log('error deleting booking')
    })
})


module.exports = router;