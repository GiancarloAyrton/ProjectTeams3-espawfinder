// authController.mysql.js – Adaptado para MySQL con mysql2
const db = require('../config/mysql');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registrarse
exports.register = async (req, res) => {
  try {
    const { username, email, password, deviceId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    
    db.query( 
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword],
      async (err, result) => {
        if (err) {
          console.error('Error al registrar usuario:', err);
          return res.status(500).json({ message: 'Error interno', error: err });
        }

        const userId = result.insertId;

        // Asignar posts sin usuario (deviceId) al nuevo usuario
        if (deviceId) {
          db.query('UPDATE posts SET userId = ?, deviceId = NULL WHERE deviceId = ?', [userId, deviceId]);
        }

        res.status(201).json({ message: 'Usuario registrado con éxito', userId });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Error registrando usuario', error });
  }
};

// Loguearse
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if (err) return res.status(500).json({ message: 'Error interno', error: err });
      if (results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en login', error });
  }
};