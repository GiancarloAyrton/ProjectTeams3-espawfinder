/*// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Pet');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token de autenticación no proporcionado.' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token de autenticación inválido.' });
        }

        const decodedToken = jwt.verify(token, 'secret_key');
        const userId = decodedToken.userId;

        console.log('decodedToken:', decodedToken);
        console.log('userId:', userId);

        const user = await User.findById(userId);
        console.log('user:', user);

        if (!user) throw new Error('Usuario no encontrado.');

        // Obtener postId de la URL
        const postId = req.params.id; // ID de la publicación desde la URL
        console.log('postId:', postId);

        const post = await Post.findById(postId);
        console.log('post:', post);

        // Verificar si la publicación existe y el usuario tiene permisos
        if (!post) {
            throw new Error('Publicación no encontrada.');
        }

        if (post.createdBy.toString() === userId) {
            req.userData = { userId: decodedToken.userId };
            next(); // Continuar con la siguiente middleware o ruta
        } else {
            throw new Error('No tienes permisos para realizar esta acción.');
        }
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Acceso no autorizado.' });
    }
};
*/
