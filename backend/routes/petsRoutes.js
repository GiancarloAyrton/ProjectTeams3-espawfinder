const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Rutas públicas
//router.use(authMiddlewareTOKEN);
router.get('/pets', petController.getAllPets);
router.get('/pets/:id', petController.getPetById);
router.post('/pets', petController.createPet);

// Rutas protegidas (requieren autenticación)
router.put('/pets/:id', petController.updatePetById);
router.delete('/delete/:id', petController.deletePetById);

router.get('/pets/nearby',petController.nearby);

module.exports = router;

