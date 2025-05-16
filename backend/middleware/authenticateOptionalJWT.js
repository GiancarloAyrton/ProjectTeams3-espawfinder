const jwt = require('jsonwebtoken');

const authenticateOptionalJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    req.isAuthenticated = false;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    req.isAuthenticated = true;
    next();
  } catch (error) {
    req.isAuthenticated = false;
    next();
  }
};

module.exports = authenticateOptionalJWT;
