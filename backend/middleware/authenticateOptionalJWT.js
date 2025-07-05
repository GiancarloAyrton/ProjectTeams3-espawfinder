// middleware/authenticateOptionalJWT.mysql.js
const jwt = require('jsonwebtoken');
const db = require('../config/mysql');


const authenticateOptionalJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      req.isAuthenticated = false;
      return next();
    }

    const userId = decoded.id;

    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
      if (err || results.length === 0) {
        req.isAuthenticated = false;
      } else {
        req.user = results[0];
        req.userId = results[0].id; 
        req.isAuthenticated = true;
      }
      next();
    });
  });
};

module.exports = authenticateOptionalJWT;
