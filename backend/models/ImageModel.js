const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: { type: String, required: true },
  imagePaths: [{ type: String, required: true }], // Array de nombres de archivos de imágenes
  videoPaths: [{ type: String, required: true }], // Array de nombres de archivos de videos
  breed: { type: String },
  type: { type: String, required: true },
  color: { type: String },
  gender: { type: String },
  age: { type: String },
  size: { type: String },
  petCondition: { type: String }, // Condición de la mascota
  lostOrFoundDate: { type: Date },
  lostOrFoundLocation: { type: String },
  latitude: { type: Number }, // Geolocation latitude
  longitude: { type: Number }, // Geolocation longitude
  ownerName: { type: String, required: true }, // Nombre del dueño
  reward: { type: String }, // Recompensa ofrecida
  ownerPhone: { type: String, required: true }, // Teléfono del dueño
  ownerEmail: { type: String, required: true }, // Correo electrónico del dueño
  ownerMessage: { type: String },
  deviceId: { type: String },
  userId: { type: String, ref: 'User' },
  status: { type: String, enum: ['lost', 'found', 'adoption', 'lookingForMate', 'solidarityHelp'], required: true }, // Estado de la publicación
}, { timestamps: true });

module.exports = mongoose.model('Image', ImageSchema);
