import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PetCard from './PetCard';
import './PetCardsContainer.css';

const PetCardsPareja = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/upload/pareja`); // Asegúrate de que esta URL sea correcta
        setPets(response.data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="pet-cards-container">
      <h2>¡Encuentra a tu media naranja!</h2>
      <p>Conecta con mascotas del sexo opuesto en nuestra plataforma de citas para mascotas.</p>
      <div className="cards-wrapper">
        
        <div className="pet-card">
        <div className={`badge ${pet.gender.toLowerCase()}`}>
            {pet.gender}
        </div>
        <h4>{pet.name}</h4>
        <p>{pet.breed}, {pet.age} años</p>
        <button className="contact-btn">Contactar</button>
        <div className="likes">
            <i className="fa fa-heart"></i> {pet.likes}
        </div>
        </div>

      </div>
    </div>
  );
};

export default PetCardsPareja;
