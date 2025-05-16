const express = require('express');
const router = express.Router();
const Pet  = require('../models/Pet');


// Middleware para generar o recuperar deviceId
const setDeviceId = (req, res, next) => {
  let deviceId = req.cookies.deviceId;
  if (!deviceId) {
    deviceId = require('crypto').randomBytes(16).toString('hex');
    res.cookie('deviceId', deviceId, { maxAge: 900000, httpOnly: true });
  }
  req.deviceId = deviceId;
  next();
};

router.use(setDeviceId);

// Crear una nueva publicación de mascota
exports.createPet = async (req, res) => {
  try {
    const { title, description, image, contactInfo, type, breed, color, size, gender, age, lostOrFoundLocation, lostOrFoundDate, latitude, longitude, deviceId } = req.body;
    let userId = null;

    if (req.user) {
      userId = req.user._id;
    }

    const newPost = new Post({
      title,
      description,
      image,
      contactInfo,
      type,
      breed,
      color,
      size,
      gender,
      age,
      lostOrFoundLocation,
      lostOrFoundDate,
      latitude,
      longitude,
      deviceId: userId ? null : deviceId,
      userId
    });

    await newPost.save();
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};



// Obtener todas las mascotas publicadas
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.send(pets);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Obtener detalles de una mascota por su ID
exports.getPetById = async (req, res) => {
  const _id = req.params.id;
    try {
        const pet = await Pet.findById(_id);
        if (!pet) {
            return res.status(404).send();
        }
        res.send(pet);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Actualizar los detalles de una mascota por su ID
exports.updatePetById = async (req, res) => {
  const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'image', 'contactInfo', 'type', 'breed', 'color', 'size', 'gender', 'age', 'lostOrFoundLocation', 'lostOrFoundDate', 'latitude', 'longitude'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const pet = await Pet.findById(req.params.id);

        if (!pet) {
            return res.status(404).send({ error: 'Pet not found' });
        }

        updates.forEach(update => pet[update] = req.body[update]);
        await pet.save();
        io.emit('updatePet', pet); // Emitir un evento de actualización de publicación
        res.send(pet);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Eliminar una mascota por su ID
exports.deletePetById = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
        return res.status(404).send({ error: 'Pet not found' });
    }

    io.emit('deletePet', pet); // Emitir un evento de eliminación de publicación
    res.send(pet);
  } catch (error) {
      res.status(500).send(error);
  }
};

// Buscar mascotas cercanas
exports.nearby = async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  const rad = parseFloat(radius) || 5; // Radio en kilómetros

  const earthRadiusInKm = 6371; // Radio de la tierra en kilómetros

  try {
      const pets = await Pet.find({
          latitude: { $gt: latitude - rad / earthRadiusInKm, $lt: latitude + rad / earthRadiusInKm },
          longitude: { $gt: longitude - rad / earthRadiusInKm, $lt: longitude + rad / earthRadiusInKm }
      });
      res.send(pets);
  } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
  }
};