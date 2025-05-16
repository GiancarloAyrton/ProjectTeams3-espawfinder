import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/SolidarityHelp.css'; // Asegúrate de que este archivo CSS existe y está configurado

const SolidarityHelpCard = () => {
  const [helpPosts, setHelpPosts] = useState([]);

  useEffect(() => {
    const fetchHelpPosts = async () => {
      try {
        const response = await axios.get('https://espawfinder.com/backend/upload/solidarityhelp?limit=4'); // Ajusta el límite si es necesario
        setHelpPosts(response.data.files);
      } catch (error) {
        console.error('Error fetching help posts:', error);
      }
    };

    fetchHelpPosts();
  }, []);

  return (
    <section id="solidarity-help-section" className="custom-solidarity container-fluid pl-0 pr-0">
      <div className="solidarity-help-container">
      <div className="section-heading text-center">
          <p className="subtitle">Sé su héroe</p>
          <h2>Apadrina una <span className="text-tertiary">esperanza</span> hoy</h2>
        </div>
        <div className="solidarity-help-cards">
          {helpPosts.map((post) => {
            const imageUrl = `https://espawfinder.com/backend/uploads/${post.imagePaths}`;
            console.log('Image URL:', imageUrl); // Aquí está el console.log para depuración
            return (
              <div className="card" key={post._id}>
                <div className="card-header">
                  <img 
                    src={imageUrl} 
                    alt={post.title} 
                    className="card-image" 
                    style={{ height: "200px", objectFit: "cover" }} // Ajusta la imagen a la tarjeta
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.petCondition}</p>
                  <button className="contactar">Contactar</button>
                  <div className="likes">
                    <i className="fas fa-heart"></i> {Math.floor(Math.random() * 100)} {/* Random likes */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="form-flex">
          <a href="/posts" className="btn btn-publicar btn-primary">Ver más</a>
        </div>
      </div>
    </section>
  );
};

export default SolidarityHelpCard;
