const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');
const { User } = require('../db/db.js');

const register = (req, res) => {
  // console.log(req.body);
    const { username, email, password, status } = req.body;

    const isUser = User.findAll({
      where: {
        username: username
      }
    })

    console.log(isUser);

    const newUser = User.create({
      username,
      email,
      password,
      status
    })

    // need to query DB to check if user exists
    // const check = await pool.query('SELECT username FROM users WHERE username = $1', [username])
    // if (check.rows.length !== 0) {
    //   return console.log(`user of name ${username} exists`);
    // }
    // // if user does not exists, create password hash
    // const passwordHash = await bcrypt.hash(password, saltRounds)

    // pool.query('INSERT INTO users (username, email, password, status) VALUES ($1, $2, $3, $4) RETURNING id, username', [username, email, passwordHash, status], function(err, result) {
    //   if (err) {
    //     throw err;
    //   }
      //serialize token using some user info and a key that can be created and stored in .env
      // const accessToken = jwt.sign({ username }, process.env.TOKEN_KEY);

      // send token to client to store and identify
      // return res.status(201).json({
      //   username,
      //   email,
      //   status,
      //   accessToken
      // })
    // })
}


module.exports = {
  register,
};