import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/AdoptionCard.css'

const AdoptionGallery = () => {
  const [adoptionPosts, setAdoptionPosts] = useState([]);

  useEffect(() => {
    const fetchAdoptionPosts = async () => {
      try {
        const response = await axios.get('https://espawfinder.com/backend/upload/adoption?limit=4');
        setAdoptionPosts(response.data.files);
      } catch (error) {
        console.error('Error fetching adoption posts:', error);
      }
    };

    fetchAdoptionPosts();
  }, []);

  return (
    <section id="adoption-home3" className="custom-section-adoption container-fluid pl-0 pr-0">
  
  <div className="adoption-gallery-container">
    <div className="adoption-gallery-cards">
      {adoptionPosts.map((post) => {
        const imageUrl = `https://espawfinder.com/backend/uploads/${post.imagePaths}`;
        console.log('Image URL:', imageUrl); // Aquí está el console.log
        return (
          <div className="card" key={post._id}>
            <img 
              src={imageUrl}
              alt={post.title} 
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }} // Ajusta la imagen a la tarjeta
            />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.breed}, {post.age}</p>
              <button className="btn btn-primary">Adoptar</button>
              <div className="likes">
                <i className="fas fa-heart"></i> {Math.floor(Math.random() * 100)} {/* Random likes */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
    <div className='form-flex'>
    <a href="/posts" className="btn btn-publicar btn-primary">Ver mas</a>
    </div>
  </div>
</section>






  );
};

export default AdoptionGallery;
