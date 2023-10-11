const express = require('express');
const router = express.Router();
const db = require('../model/model');

router.get('/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows[0].name)
    })
})

module.exports = router;