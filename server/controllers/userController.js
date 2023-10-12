const bcrypt = require('bcrypt');

const userController = {};

// Middleware function to add user to database. Also checks if user already exists
userController.addUser = async (req, res, next) => {

  // Object destructing to grab user inputs from request body
  const { name, email } = req.body;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Try statement to add inputs to database
  try {
    
    // SQL Command to insert into users table
    const addUserQuery = 'INSERT INTO users(name, address, password) VALUES ($1, $2, $3)'
    await db.query(addUserQuery, [name, email, hashedPassword]).then((data) => {
      console.log(data)
      res.status(200).json(data)
    })

    return next();
  } catch (err) {
    return next({
      log: `userController.addUser: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.addUser. Check server logs for more details.'},
      status: 500
    })
  }
}

// Middleware function to check if user logging in exists in database
userController.loginUser = async (req, res, next) => {
  try {

  } catch (err) {
    return next({
      log: `userController.loginUser: ERROR: ${err}`,
      message: { err: 'Error occurred in userController.loginUser. Check server logs for more details.'},
      status: 500
    })
  }
}


module.exports = userController;