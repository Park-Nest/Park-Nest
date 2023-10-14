const express = require('express');
const router = express.Router();
const db = require('../model/model');
const userController = require('../controllers/userController');

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer')

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_BUCKET_REGION
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


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

// Route handler for signing up user
router.post('/auth/signup',
    userController.addUser,
    (req, res) => {
        return res.status(200).json({ user: true })
    }
)

router.post('/post-listing', upload.single('image'), async (req, res, next) => {
    console.log(req.file)
    console.log(req.body)
    const image_key = Date.now().toString()
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image_key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    //This sends the photo to the S3 bucket
    await s3.send(command)

    const { name, address, city, state, zipcode, country, hours, rate, available, description } = req.body
    const text = `INSERT INTO listings (userid, name, address, city, state, zipcode, country, hours, rate, description, available, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`
    try {
        await db.query(text, [1, name, address, city, state, zipcode, country, hours, rate, description, available, image_key])

        //Use this code if you want to get an image from the s3 bucket based on the key
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            //this is just an example key, when you query the sql db you want to add the value that's in the image column
            Key: '1697234676232',
        }
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        res.json(url);
    }
    catch (e) {
        next(e);
    }
})

module.exports = router;