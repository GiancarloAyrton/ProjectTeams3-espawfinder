// uploadController.mysql.js – Adaptado para MySQL con mysql2

const path = require('path');
const multer = require('multer');
const db = require('../config/mysql');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).array('files', 15);

// Subir archivo y guardar en MySQL
exports.uploadFile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading files', error: err });
    }

    const {
      title, breed, type, color, gender, age, size, petCondition, lostOrFoundDate,
      lostOrFoundLocation, latitude, longitude, ownerName, reward, ownerPhone,
      ownerEmail, ownerMessage, deviceId, status
    } = req.body;
    console.log('🧾 req.body:', req.body); // Muestra los campos enviados (solo si no es FormData)
    console.log('👤 req.userId:', req.userId); // Muestra el ID del usuario extraído del token
    console.log('🔐 req.user:', req.user);
    const imagePaths = req.files
      .filter(file => file.mimetype.startsWith('image/'))
      .map(file => file.filename)
      .join(',');

    const videoPaths = req.files
      .filter(file => file.mimetype.startsWith('video/'))
      .map(file => file.filename)
      .join(',');

    const userId = req.userId || req.body.userId;

    const query = ` 
      INSERT INTO uploads (
        title, breed, type, color, gender, age, size, petCondition,
        lostOrFoundDate, lostOrFoundLocation, latitude, longitude,
        ownerName, reward, ownerPhone, ownerEmail, ownerMessage,
        deviceId, userId, status, imagePaths, videoPaths
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;


    const values = [
      title, breed, type, color, gender, age, size, petCondition, lostOrFoundDate,
      lostOrFoundLocation, latitude, longitude, ownerName, reward, ownerPhone,
      ownerEmail, ownerMessage, deviceId, userId, status, imagePaths, videoPaths
    ];

    db.query(query, values, (error, result) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving data to database', error });
      }
      res.json({ message: 'Files uploaded and data saved successfully', id: result.insertId });
    });
  });
};

// Obtener todas las publicaciones
exports.getAllFiles = (req, res) => {
  db.query('SELECT * FROM uploads ORDER BY createdAt DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving data', details: err });
    res.json(results);
  });
};

// Obtener publicaciones paginadas por estado
function getPaginatedByStatus(status) {
  return (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    let sql = '';
    let countSql = '';
    let params = [];
    let countParams = [];

    if (status === '%') {
      sql = 'SELECT * FROM uploads ORDER BY createdAt DESC LIMIT ? OFFSET ?';
      countSql = 'SELECT COUNT(*) AS total FROM uploads';
      params = [limit, offset];
      countParams = [];
    } else {
      sql = 'SELECT * FROM uploads WHERE status = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?';
      countSql = 'SELECT COUNT(*) AS total FROM uploads WHERE status = ?';
      params = [status, limit, offset];
      countParams = [status];
    }
    db.query(sql, params, (err, files) => {
      if (err) return res.status(500).json({ error: 'Error retrieving data', details: err });

      db.query(countSql, countParams, (countErr, countRes) => {
        if (countErr) return res.status(500).json({ error: 'Error counting records', details: countErr });

        const total = countRes[0].total;
        res.json({
          files,
          total,
          hasMore: page * limit < total
        });
      });
    });
  };
}
exports.editPost = (req, res) => {
  const { id } = req.params;
  const {
    title,
    breed,
    color,
    gender,
    age,
    size,
    petCondition,
    ownerMessage,
  } = req.body;

  const query = `
    UPDATE uploads SET
      title = ?,
      breed = ?,
      color = ?,
      gender = ?,
      age = ?,
      size = ?,
      petCondition = ?,
      ownerMessage = ?
    WHERE id = ?
  `;

  const values = [
    title,
    breed,
    color,
    gender,
    age,
    size,
    petCondition,
    ownerMessage,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating post', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No post found with this ID' });
    }

    res.json({ message: 'Post updated successfully' });
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM uploads WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting post', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No post found with this ID' });
    }

    res.json({ message: 'Post deleted successfully' });
  });
}; 


exports.getSinglePost = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM uploads WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error retrieving post', details: err });
    if (results.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(results[0]);
  });
};
exports.getPaginatedFiles = getPaginatedByStatus('%'); // All
exports.getPaginatedLostFiles = getPaginatedByStatus('lost');
exports.getPaginatedFoundFiles = getPaginatedByStatus('found');
exports.getPaginatedAdoptionFiles = getPaginatedByStatus('adoption');
exports.getPaginatedLookingForMateFiles = getPaginatedByStatus('lookingForMate');
exports.getSolidarityHelpPosts = getPaginatedByStatus('solidarityHelp');
