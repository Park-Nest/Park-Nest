const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const db = require('./model/model');
require('dotenv').config();
const apiRouter = require('./routes/api.js')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require('multer')

//handle request bodies
app.use(express.json());
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


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_BUCKET_REGION
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.get('/home/getUser', (req, res) => {
    const text = 'SELECT * FROM users;'
    db.query(text).then((data) => {
        console.log(data.rows)
        res.json(data.rows[0].name)
    })
})



app.post('/post-listing', upload.single('image'), async (req, res, next) => {
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

//Page Not Found
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
})

//Global Error Handler
// app.use((err, req, res, next) => {
//     const defaultErr = {
//         log: 'unknown error handler caught in middleware',
//         status: 400,
//         message: { err: 'An error occured' },
//     }
//     const errorObj = Object.assign({}, defaultErr, err);
//     return res.status(errorObj.status).send(errorObj.message);
// })

//Listening on port 3000
app.listen(3000, () => { console.log(`Listening on port 3000...`) });

//export app
module.exports = app;