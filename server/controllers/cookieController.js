const express = require('express');
const path = require('path');
const { Console } = require('node:console'); 
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const db = require('../model/model')
require('dotenv').config();

app.use(cookieParser());

const cookieController = {};

cookieController.setSSID = async (req, res, next) => {

  const id = {
    userid: res.locals.id 
  }

  try {
    const jtoken = await jwt.sign(id, process.env.SECRET_KEY);
    res.cookie('ssid', jtoken, { expires: new Date(Date.now() + 300000), httpOnly: true })
    return next()
  } catch (err) {
    return next({
      log: `cookieController.setSSID: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.setSSID. Check server logs for more details.'},
      status: 500
    })
  }
}

cookieController.checkSSID = async (req, res, next) => {

  const check = req.cookies.ssid;

  // const decodedToken = jwt.decode(check)

  try {
    const userid = jwt.verify(check, process.env.SECRET_KEY)
    res.locals.user = true
    return next();
  } catch (err) {
    console.log('error!')
    res.locals.user = false
    return next();
  }
}

module.exports = cookieController;