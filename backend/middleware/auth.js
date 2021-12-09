const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  //split because header returns as Authorization: Bearer TOKEN
  //check if auth header exists, if not return undefined
  const token = authHeader && authHeader.split(' ')[1];

  // if no token is given
  if(token == null) {
    return res.sendStatus(401)
  }

  //verify token with jwt method
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    } else {
      // set request user to equal user returned from callback
      req.user = user
      //move on from middleware
      next();
    }
  });
}

module.exports = {
  verifyUser
}
