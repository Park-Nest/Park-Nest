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
const cookieController = require('../controllers/cookieController')


router.get('/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.status(200).json(data.rows[0].name)
    }).catch((err) => {
        console.log('error getting user')
    })
})

router.get('/getListings', async (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's listings
    const text = 'SELECT * FROM listings WHERE userid=1;'
    try {
        let dataRows = await db.query(text)
        console.log(dataRows.rows);
        for (const listing of dataRows.rows) {
            const getObjectParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                //this is just an example key, when you query the sql db you want to add the value that's in the image column
                Key: listing.photo,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            listing.photo = url;
        }
        res.status(200).json(dataRows.rows)
    }
    catch (err) {
        console.log('error getting listings: ' + err)
    }
})

router.get('/getBookings', async (req, res) => {
    //replace userid value after authorization is ready, currently getting Derek's Bookings
    const text = 'SELECT listings.* FROM bookings JOIN listings ON listings.listingID = bookings.listingID WHERE bookings.userid=1;'
    try {
        let dataRows = await db.query(text)
        console.log(dataRows.rows);
        for (const listing of dataRows.rows) {
            const getObjectParams = {
                Bucket: process.env.AWS_BUCKET_NAME,
                //this is just an example key, when you query the sql db you want to add the value that's in the image column
                Key: listing.photo,
            }
            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            listing.photo = url;
        }
        res.status(200).json(dataRows.rows)
    }
    catch (err) {
        console.log('error getting listings: ' + err)
    }
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

// Route handler for loggin in user
router.post('/auth/login',
  userController.loginUser,
  cookieController.setSSID,
  (req, res) => {
    return res.status(200).json({user: true})
  }
)

// Route handler to check user's cookies
router.get('/verify-jwt', 
  cookieController.checkSSID, 
  (req, res) => {
    if (!res.locals.user) {
      return res.status(200).send(res.locals.user)
  } else {
      return res.status(200).send(res.locals.user)
  }}
)

router.get('/logout', (req, res) => {
  // Clear the "httpOnly" cookie
  res.clearCookie('ssid');

  // Send a response indicating successful logout (optional)
  res.status(200).send({ message: 'Logged out successfully' });
});

module.exports = router;