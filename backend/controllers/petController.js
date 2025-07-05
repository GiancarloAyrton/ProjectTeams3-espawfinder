
// petController.mysql.js – Versión adaptada a MySQL con mysql2

const db = require('../config/mysql');
 

// Crear una nueva publicación de mascota
exports.createPet = (req, res) => {
  const {
    title, description, image, contactInfo, type, breed, color, size,
    gender, age, lostOrFoundLocation, lostOrFoundDate,
    latitude, longitude, deviceId
  } = req.body;

  const userId = req.user?.id || null;

  db.query(
    `INSERT INTO posts (title, description, image, contactInfo, type, breed, color, size, gender, age,
     lostOrFoundLocation, lostOrFoundDate, latitude, longitude, deviceId, userId)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, description, image, contactInfo, type, breed, color, size, gender, age,
     lostOrFoundLocation, lostOrFoundDate, latitude, longitude, deviceId, userId],
    (err, result) => {
      if (err) {
        console.error('Error al crear mascota:', err);
        return res.status(500).json({ error: 'Error interno' });
      }
      res.status(201).json({ message: 'Mascota creada', id: result.insertId });
    }
  );
};

// Obtener todas las mascotas publicadas
exports.getAllPets = (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
};

// Obtener detalles de una mascota por su ID
exports.getPetById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM posts WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ error: 'Pet not found' });
    res.send(results[0]);
  });
};

// Actualizar los detalles de una mascota por su ID
exports.updatePetById = (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updates);

  db.query(`UPDATE posts SET ${fields} WHERE id = ?`, [...values, id], (err, result) => {
    if (err) return res.status(400).send(err);
    res.send({ message: 'Pet updated successfully' });
  });
};

// Eliminar una mascota por su ID
exports.deletePetById = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Pet deleted successfully' });
  });
};

// Buscar mascotas cercanas (simplificado)
exports.nearby = (req, res) => {
  const { latitude, longitude, radius } = req.query;
  const rad = parseFloat(radius) || 5;

  const latMin = parseFloat(latitude) - rad / 111;
  const latMax = parseFloat(latitude) + rad / 111;
  const lonMin = parseFloat(longitude) - rad / 111;
  const lonMax = parseFloat(longitude) + rad / 111;

  db.query(
    `SELECT * FROM posts WHERE latitude BETWEEN ? AND ? AND longitude BETWEEN ? AND ?`,
    [latMin, latMax, lonMin, lonMax],
    (err, results) => {
      if (err) return res.status(500).send({ error: 'Internal Server Error' });
      res.send(results);
    }
  );
};
