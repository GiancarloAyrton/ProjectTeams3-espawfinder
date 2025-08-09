const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', uploadController.uploadFile);
router.get('/all', uploadController.getPaginatedFiles);
router.get('/allP/:id', uploadController.getIdAllPost);
router.get('/lost', uploadController.getPaginatedLostFiles);
router.get('/found', uploadController.getPaginatedFoundFiles);
router.get('/adoption', uploadController.getPaginatedAdoptionFiles);
router.get('/lookingformate', uploadController.getPaginatedLookingForMateFiles);
router.get('/solidarityHelp', uploadController.getSolidarityHelpPosts);
router.get('/:id', uploadController.getSinglePost);
router.delete('/:id', uploadController.deletePost);
router.put('/edit/:id', uploadController.editPostWithFiles);   
module.exports = router; 
router.use((req, _res, next) => {
    console.log('🔎 uploadRouter hit ->', req.method, req.originalUrl);
    next();
});
