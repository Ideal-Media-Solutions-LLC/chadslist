const bcrypt = require('bcrypt');
const saltRounds = 8;
const jwt = require('jsonwebtoken');
const User = require('../db/models/User.js');

const register = async(req, res) => {

    const { userName, email, password, accType } = req.body;

      const isUser = await User.findOne({ where: { userName: userName }});

      if(!isUser) {
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = await User.create({
          userName,
          email,
          password: passwordHash,
          accType,
         })

        //  await newUser.save();
        const accessToken = await jwt.sign({ id: newUser.id, userName: newUser.userName, email: newUser.email, accType: newUser.accType }, process.env.TOKEN_KEY);
        return res.status(201).json({
          id: newUser.id,
          userName,
          email,
          accType,
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
      const accessToken = await jwt.sign({ id: isUser.id, userName: isUser.userName, email: isUser.email, accType: isUser.accType }, process.env.TOKEN_KEY);

      return res.status(201).json({
        id: isUser.id,
        userName: isUser.userName,
        email: isUser.email,
        accType: isUser.accType,
        accessToken
      })
    }

  } else {
    debugger;
    res.status(401).send({ message: `Error logging in` });
  }
  // if correct, send access token back to client
}

const verify = (req, res) => {
  return res.json(req.user);
}
module.exports = {
  register,
  login,
  verify
};