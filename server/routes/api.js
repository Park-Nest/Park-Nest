const express = require('express');
const router = express.Router();
const db = require('../model/model');
const userController = require('../controllers/userController');


router.get('/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows[0].name)
    })
})

router.get('/getListings', (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's listings
    const text = 'SELECT * FROM listings WHERE userid=1;'
    db.query(text).then((data) => {
        res.json(data.rows)
    })
  })

router.get('/getBookings', (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's Bookings
    const text = 'SELECT listings.* FROM bookings JOIN listings ON listings.listingID = bookings.listingID WHERE bookings.userid=1;'
    db.query(text).then((data) => {
        res.json(data.rows)
    })
})

// Route handler for signing up user
router.post('/auth/signup',
  userController.addUser,
  (req, res) => {
    return res.status(200).json({user: true})
  }
)

// Route handler for loggin in user
router.post('/auth/login',
  userController.loginUser,
  (req, res) => {
    return res.status(200).json({user: true})
  }
)

module.exports = router;