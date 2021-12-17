const User = require('../db/models/User.js');

const user = async (req, res) => {
  const { userName, email, photoUrl, accType, location, password } = req.body;
  // check if user of inserted username exists already, if so, throw 400 error
  await User.findAll({
    where: {
      userName,
    }
  })
    .then( async (data) => {
      if (data.length !== 0) {
        res.status(400).send('Username Taken');
        return;
      } else {
        // otherwise, create user
        const user = await User.create({ userName, email, photoUrl, accType, location, password })
          .then(() => {
            res.status(201).end();
          })
          .catch(err => console.log(err));
      }
    })
    .catch((err) => {
      // if any other error, send a 500 code and end;
      console.log(err);
      res.status(500).end();
    });
};

module.exports = {
  user,
};
