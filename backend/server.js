
// server.mysql.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = 3001;
const path = require('path');

// Conexión a MySQL
const db = require('./config/mysql');
db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
  } else {
    console.log('✅ Conectado a MySQL');
  }
});

// Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta raíz para prueba
app.get('/', (req, res) => {
  res.send('✅ Backend operativo y conectado a MySQL');
});

// Rutas principales
const petRoutes = require('./routes/petsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware JWTs
const authenticateJWT = require('./middleware/authenticateJWT');
const authenticateOptionalJWT = require('./middleware/authenticateOptionalJWT');

// Rutas públicas o semi públicas
app.use('/pets', petRoutes);
app.use('/upload', authenticateOptionalJWT, uploadRoutes);
// Rutas protegidas 
app.use('/users', userRoutes); // Login/register públicas; perfil requiere JWT dentro del controlador
app.use('/uploads', (req, res, next) => {
  console.log('🟡 Se pidió:', req.url);
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
