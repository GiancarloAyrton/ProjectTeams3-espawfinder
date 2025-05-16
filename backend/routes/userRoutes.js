// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController');

//const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);


//router.post('/forgot-password', userController.forgotPassword);
//router.post('/reset-password', userController.resetPassword);

// Rutas protegidas (requieren autenticación)
//router.use(authMiddleware.authenticateToken);
/*router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);
router.put('/change-password', userController.changePassword);
//router.delete('/delete-account', userController.deleteAccount);
router.post('/logout', userController.logoutUser);
*/
module.exports = router;



