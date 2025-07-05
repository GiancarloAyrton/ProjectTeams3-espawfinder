import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../api'; 
const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    breed,
    color,
    gender,
    age,
    size,
    petCondition,
    lostOrFoundDate,
    imagePaths = [],
  } = post;

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${BASE_URL}/upload/${id}`);
      console.log(response.data);
      navigate(`/post/${id}`);  
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  return (
    <div
      className="mb-4"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card h-100 bg-light shadow-sm adopt-card res-margin row pattern2 d-flex flex-column">
        {/* Imagen principal */}
        <div className="card-header p-0" style={{ height: '350px', overflow: 'hidden' }}>
          {imagePaths.length > 0 ? (
            <img
              src={`${BASE_URL}/uploads/${imagePaths}`}
              alt={title}
              className="img-fluid w-100"
              style={{ height: 'auto', width: '100%', objectFit: 'cover', objectPosition: 'center'}}
            />
          ) : (
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                height: 'auto',
                backgroundColor: '#ddd',
                color: '#666',
                fontSize: '1rem',
                width: '100%',
              }}
            >
              Sin imagen disponible
            </div>
          )}
        </div>
        

        {/* Contenido */}
        <div className="card-body flex-grow-1 d-flex flex-column">
          <h5 className="adoption-header">{title}</h5>
          <ul className="list-unstyled post-details mb-3">
            {breed && (
              <li>
                <strong>Raza:</strong> {breed}
              </li>
            )}
            {color && (
              <li>
                <strong>Color:</strong> {color}
              </li>
            )}
            {gender && (
              <li>
                <strong>Género:</strong> {gender}
              </li>
            )}
            {age && (
              <li>
                <strong>Edad:</strong> {age}
              </li>
            )}
            {size && (
              <li>
                <strong>Tamaño:</strong> {size}
              </li>
            )}
            {petCondition && (
              <li>
                <strong>Condición:</strong> {petCondition}
              </li>
            )}
            {lostOrFoundDate && (
              <li>
                <strong>Fecha:</strong> {new Date(lostOrFoundDate).toLocaleDateString()}
              </li>
            )}
          </ul>
          {/* Espacio vacío para empujar el botón al final */}
          <div className="mt-auto text-center">
            <button className="btn btn-primary btn-sm">Más información</button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PostCard;
