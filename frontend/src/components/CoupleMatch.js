import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/CoupleMatch.css'; // Asegúrate de tener este archivo CSS para los estilos

const CoupleMatch = () => {
  const [couplePosts, setCouplePosts] = useState([]);

  useEffect(() => {
    const fetchCouplePosts = async () => {
      try {
        const response = await axios.get('https://espawfinder.com/backend/upload/lookingformate?limit=4'); // Ajustar el límite si es necesario
        setCouplePosts(response.data.files);
      } catch (error) {
        console.error('Error fetching couple posts:', error);
      }
    };

    fetchCouplePosts();
  }, []);

  return (
    <section id="couple-match-section" className="custom-section container-fluid pl-0 pr-0">
      <div className="">
        <div className="couple-match-cards">
          {couplePosts.map((post) => {
            const imageUrl = `https://espawfinder.com/backend/uploads/${post.imagePaths}`;
            console.log('Image URL:', imageUrl); // Log para depuración
            return (
              <div className="card" key={post._id}>
                {/* Imagen de la tarjeta */}
                <img 
                  src={imageUrl} 
                  alt={post.title} 
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                {/* Género como estampo en la esquina superior derecha */}
                <div className={`badge ${post.gender === 'Macho' ? 'male' : 'female'}`}>
                  {post.gender}
                </div>
                {/* Cuerpo de la tarjeta */}
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.breed}, {post.age}</p>
                  <button className="contactar">Contactar</button>
                  <div className="likes">
                    <i className="fas fa-heart"></i> {Math.floor(Math.random() * 100)} {/* Random likes */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <a href="/posts" className="btn btn-publicar btn-secondary">
          ¡Encuentra a su media naranja!
        </a>
      </div>
    </section>
  );
};

export default CoupleMatch;
