// Pet.js - Esquema de publicaciones de mascotas
const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    contactInfo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    deviceId: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String },
    breed: { type: String },
    color: { type: String },
    size: { type: String },
    gender: { type: String },
    age: { type: String },
    lostOrFoundLocation: { type: String },
    lostOrFoundDate: { type: Date },
    latitude: { type: Number }, // Geolocation latitude
    longitude: { type: Number } // Geolocation longitude
});

module.exports = mongoose.model('Post', PostSchema);

/*
const petSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  breed: { type: String }, // raza
  location: { type: String, required: true },
  petType: { type: String, required: true }, // Ejemplo: 'Perro', 'Gato', 'Ave', etc.
  age: { type: String }, // Ejemplo: 'Cachorro', 'Adulto', 'Anciano'
  gender: { type: String }, // Ejemplo: 'Macho', 'Hembra'
  photos: [{ type: String }], // Array de URLs de imágenes
  contactInfo: {
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String }
  },
  dateTime: { type: Date, default: Date.now }, // Fecha y hora de la publicación
  status: { type: String, enum: ['Perdida', 'Encontrada'], required: true },
  reward: { type: Boolean, default: false }, // Indica si se ofrece recompensa
  postedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  tempToken: { type: String }, // Identificador temporal para asociar con usuario registrado
  createdAt: { type: Date, default: Date.now }
});

const Pet = mongoose.model('Pet', petSchema);
*/
//module.exports = Pet;
