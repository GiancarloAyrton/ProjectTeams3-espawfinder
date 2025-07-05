const User = require('../models/User');
const Pet = require('../models/Pet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// userController.mysql.js – Adaptado para MySQL con mysql2
const db = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
    db.query('SELECT id, username, email FROM users', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error interno', error: err });
        res.json(results);
    });
};

// Obtener un usuario por ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT id, username, email FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error interno', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(results[0]);
    });
};

// Actualizar usuario
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const updates = req.body;

    // Validar que haya al menos un campo para actualizar
    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No hay campos para actualizar' });
    }

    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);

    db.query(
        `UPDATE users SET ${fields} WHERE id = ?`,
        [...values, userId],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error actualizando usuario', error: err });
            }
            res.json({ message: 'Usuario actualizado' });
        }
    );
};
// Eliminar usuario
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error eliminando usuario', error: err });
        res.json({ message: 'Usuario eliminado' });
    });
};
