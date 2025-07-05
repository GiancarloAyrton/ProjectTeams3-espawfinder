// middleware/authenticateJWT.mysql.js
const jwt = require('jsonwebtoken');
const db = require('../config/mysql');


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); 

    const userId = decoded.id;

    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
      if (err || results.length === 0) return res.sendStatus(403);

      req.user = results[0]; // user: { id, username, email }
      next();
    });
  });
};

module.exports = authenticateJWT;
