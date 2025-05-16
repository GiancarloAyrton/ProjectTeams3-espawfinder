const path = require('path');
const multer = require('multer');
const Image = require('../models/ImageModel');

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).array('files', 15); // Permitir hasta 15 archivos



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
    const imagePaths = req.files
      .filter(file => file.mimetype.startsWith('image/'))
      .map(file => file.filename);
    const videoPaths = req.files
      .filter(file => file.mimetype.startsWith('video/'))
      .map(file => file.filename);

      const userId = req.userId || null; // Puede ser null si no está autenticado

    try {
      // Crear un nuevo documento con Mongoose
      const newImage = new Image({
        title, breed, type, color, gender, age, size, petCondition, lostOrFoundDate,
        lostOrFoundLocation, latitude, longitude, ownerName, reward, ownerPhone,
        ownerEmail, ownerMessage, deviceId, userId, status, imagePaths, videoPaths
      });

      // Guardar el documento en la base de datos
      await newImage.save();

      res.json({ message: 'Files uploaded and data saved successfully', title, imagePaths, videoPaths });
    } catch (error) {
      res.status(500).json({ message: 'Error saving data to database', error });
    }
  });
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await Image.find().sort({ createdAt: -1 }); // Obtener todas las publicaciones ordenadas por fecha de creación
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

exports.getPaginatedFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments();

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

// Obtener archivos perdidos paginados
exports.getPaginatedLostFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find({ status: 'lost' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments({ status: 'lost' });

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

// Obtener archivos encontrados paginados
exports.getPaginatedFoundFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find({ status: 'found' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments({ status: 'found' });

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

// Obtener archivos en adopción paginados
exports.getPaginatedAdoptionFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find({ status: 'adoption' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments({ status: 'adoption' });

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

// Obtener archivos de busca pareja paginados
exports.getPaginatedLookingForMateFiles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find({ status: 'lookingForMate' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments({ status: 'lookingForMate' });

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};

// controllers/imageController.js

exports.getSolidarityHelpPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const files = await Image.find({ status: 'solidarityHelp' })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Image.countDocuments({ status: 'solidarityHelp' });

    res.json({
      files,
      total,
      hasMore: page * limit < total
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data from database', error });
  }
};



// Nuevo controlador para obtener una publicación por su ID
exports.getSinglePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Image.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post from database', error });
  }
};
