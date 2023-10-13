const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Require in Route Handler
const apiRouter = require('./routes/api')

// enable parsing of URL-encoded form data
app.use(express.urlencoded({ extended: true }));
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

//Routes
// app.use('/home', apiRouter)

// ROUTE HANDLER (Routes are defined in api.js)
app.use('/home', apiRouter)

//Page Not Found
app.use('*', (req, res) => {
    res.status(404).send('Not Found');
})

//Global Error Handler
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'unknown error handler caught in middleware',
        status: 400,
        message: { err: 'An error occured' },
    }
    const errorObj = Object.assign({}, defaultErr, err);
    return res.status(errorObj.status).send(errorObj.message);
})

//Listening on port 3000
app.listen(3000, () => { console.log(`Listening on port 3000...`) });

//export app
module.exports = app;