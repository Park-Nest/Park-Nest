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

// Route handler for signing up user
router.post('/auth/signup',
  userController.addUser,
  (req, res) => {
    return res.status(200).json({user: true})
  }
)

module.exports = router;