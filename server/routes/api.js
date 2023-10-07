const express = require('express');
const app = express();
const router = express.Router();

router.get('/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.json(data.rows[0].name)
    })
})

module.exports = router;