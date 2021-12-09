const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');
const { User } = require('../db/db.js');

const register = async(req, res) => {
  // console.log(req.body);
    const { userName, email, password, status } = req.body;

      const isUser = await User.findOne({ where: { userName: userName }});

      if(!isUser) {
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
          userName,
          email,
          password: passwordHash,
          status,
         })

        //  await newUser.save();
        const accessToken = await jwt.sign({ userName: newUser.userName }, process.env.TOKEN_KEY);
        return res.status(201).json({
          userName,
          email,
          status,
          accessToken
        })
      } else {
        res.status(401).send({ message: `Username '${userName}' is already taken.` });
      }

}


module.exports = {
  register,
};