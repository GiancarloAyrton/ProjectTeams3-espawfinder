// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authenticateJWT = require('./middleware/authenticateJWT');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {})
.then(() => {
  console.log('Conectado a la base de datos MongoDB');
})
.catch((err) => {
  console.error('Error al conectar a MongoDB:', err);
});

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());




// Rutas
const petRoutes = require('./routes/petsRoutes');
const userRoutes = require('./routes/userRoutes');


app.use('/pets', petRoutes);

app.use(authenticateJWT);
app.use('/users', userRoutes);


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error del servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
