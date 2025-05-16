const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Pet');

// Registrarse
exports.register = async (req, res) => {
    try {
      const { username, email, password, deviceId } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      if (deviceId) {
        await Post.updateMany({ deviceId }, { userId: savedUser._id, deviceId: null });
      }
  
      res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  };

  // Loguearse
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  };