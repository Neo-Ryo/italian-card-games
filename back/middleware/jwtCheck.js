const jwt = require('jsonwebtoken');
const { SECRET } = process.env;
module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ message: 'invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};
