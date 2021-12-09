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

const login = async (req, res) => {

  // find user by login
  const { email, password } = req.body
  // use bcrypt to compare password with hashed password
  const isUser = await User.findOne({ where: { email }})

  if (isUser) {
    const passwordMatch = await bcrypt.compare(password, isUser.password);

    if(!passwordMatch) {
      res.status(401).send({ message: 'Password does not match'})
    } else {
      console.log(isUser.dataValues.userName, 'testing')
      const accessToken = await jwt.sign({ userName: isUser.userName }, process.env.TOKEN_KEY);

      return res.status(201).json({
        userName: isUser.userName,
        email: isUser.email,
        status: isUser.status,
        accessToken
      })
    }

  } else {
    res.status(401).send({ message: `Error logging in` });
  }
  // if correct, send access token back to client
}


module.exports = {
  register,
  login
};