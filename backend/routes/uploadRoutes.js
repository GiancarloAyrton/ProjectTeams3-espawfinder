const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', uploadController.uploadFile);
router.get('/all', uploadController.getPaginatedFiles);
router.get('/lost', uploadController.getPaginatedLostFiles);
router.get('/found', uploadController.getPaginatedFoundFiles);
router.get('/adoption', uploadController.getPaginatedAdoptionFiles);
router.get('/lookingformate', uploadController.getPaginatedLookingForMateFiles);
router.get('/solidarityHelp', uploadController.getSolidarityHelpPosts);
router.get('/:id', uploadController.getSinglePost); // Nueva ruta para obtener una única publicación


module.exports = router;
