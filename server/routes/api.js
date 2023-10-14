const express = require('express');
const router = express.Router();
const db = require('../model/model');
const userController = require('../controllers/userController');


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
    console.log('req body id:', req.body.id)
    const text = 'DELETE FROM bookings WHERE listingid=$1';
    const values = [req.body.id]
    db.query(text, values).then(data => {
        res.sendStatus(200).json('booking deleted')
    }).catch((err) => {
        console.log('error deleting booking')
    })
})

router.post('/update-listing', (req, res) => {

    const updatedListing = req.body;
    const listingid = req.body.listingid;
    let text = "UPDATE listings SET name=$1, address=$2, city=$3, state=$4, zipcode=$5, country=$6, rate=$7, description=$8 WHERE listingid =$9;"

    db.query(text, [updatedListing.name, updatedListing.address, updatedListing.city, updatedListing.state, updatedListing.zipcode, updatedListing.country, Number(updatedListing.rate), updatedListing.description, listingid])

    res.sendStatus(200)
})

router.post('/remove-listing', (req, res) => {
    const listingid = req.body.listingid;
    console.log(listingid);

    const text = "DELETE FROM listings WHERE listingid=$1;"
    db.query(text, [listingid])
    
    res.sendStatus(200)
})



// Route handler for signing up user
router.post('/auth/signup',
  userController.addUser,
  (req, res) => {
    return res.status(200).json({user: true})
  }
)

module.exports = router;