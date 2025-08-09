import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { jwtDecode } from 'jwt-decode';
import './../css/customFormulario.css';
import './../css/SinglePost.css';
import BASE_URL from '../api';
const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/upload/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('❌ Error al obtener la publicación:', error);
      }
      setLoading(false);
    };

    // Obtener usuario autenticado desde el token
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthenticatedUserId(decodedToken.id.toString());
        setUserRole(decodedToken.rol || 'sin rol');
        console.log('rol:', decodedToken.rol);

      } catch (error) {
        console.error('❌ Error al decodificar el token:', error);
      }
    }

    fetchPost();
  }, [id]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo de imágenes
  const handleFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  // Actualizar publicación en la base de datos
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No estás autenticado');
        return;
      }

      let response;
      if (newFiles.length === 0) {
        response = await axios.put(
          `${BASE_URL}/upload/edit/${id}`,
          post,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        const formData = new FormData();
        Object.keys(post).forEach((key) => {
          formData.append(key, post[key]);
        });

        newFiles.forEach((file) => {
          formData.append('files', file);
        });

        response = await axios.put(
          `${BASE_URL}/upload/edit/${id}`, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      if (response.status === 200) {
        alert('Publicación actualizada correctamente');
        setIsEditing(false);
        setNewFiles([]);

        // Volver a cargar la publicación actualizada
        const updatedPost = await axios.get(`${BASE_URL}/upload/${id}`);
        setPost(updatedPost.data);
      }
    } catch (error) {
      console.error('❌ Error al actualizar:', error);
      alert('Error al actualizar la publicación');
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewFiles([]);
  };

  // Eliminar publicación
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No estás autenticado');
        return;
      }

      console.log('🔹 Enviando solicitud DELETE a:', `${BASE_URL}/upload/${id}`);
      console.log('🔹 Token utilizado:', token);

      const response = await axios.delete(`${BASE_URL}/upload/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('✅ Respuesta del servidor:', response);


      alert('Publicación eliminada correctamente.');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('❌ Error en la respuesta del servidor:', error.response.data);
        alert(`Error al eliminar: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        console.error('❌ No hubo respuesta del servidor:', error.request);
        alert('Error al eliminar la publicación: No se recibió respuesta del servidor.');
      } else {
        console.error('❌ Error en la solicitud:', error.message);
        alert(`Error al eliminar la publicación: ${error.message}`);
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando publicación...</p>;
  if (!post) return <p className="text-center mt-5">No se encontró la publicación.</p>;
  const isOwner = authenticatedUserId == post.userId || userRole === "administrador";
  const formatStatus = (status) => {
    switch (status) {
      case 'lost':
        return 'Mascota Perdida';
      case 'found':
        return 'Mascota Encontrada';
      case 'adoption':
        return 'En Adopción';
      case 'lookingForMate':
        return 'Busca Pareja';
      case 'solidarityHelp':
        return 'Ayuda Solidaria';
      default:
        return 'Estado Desconocido';
    }
  };

  return (
    <div className="centrar-todo">
      <div className="formulario jumbotron jumbotron-fluid">
        <div className="container">
          <div className="jumbo-heading" data-aos="fade-up">
            <h1 className="Busqueda">{formatStatus(post.status)}</h1>
          </div>
        </div>
      </div>

      <div className="px-4 mt-2 mb-2">
        <div className="row" style={{ height: '100%', flexWrap: 'nowrap' }}>
          {/* Columna izquierda */}
          <div className="container-fluid-home card bg-light col-lg-9 d-flex flex-column adopt-card">
            <div className="row">
              <div className="col-md-5 singlepost">
                {post.imagePaths?.length > 0 ? (
                  <img
                    src={`${BASE_URL}/uploads/${post.imagePaths}`}
                    alt={post.title}
                    className="img-fluid rounded mb-3"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                ) : (
                  <div className="text-center bg-light py-5 rounded">No hay imagen disponible</div>
                )}
              </div>
              <div className="card-body flex-grow-1 d-flex flex-column">
                {isEditing ? (
                  <>
                    <h4 className='edit-container-h4'>Editando publicación</h4>
                    <div className="edit-container">
                      <input type="text" name="title" className="adoption-header form-control mb-2" value={post.title} onChange={handleInputChange} />
                    </div>

                    <div className="edit-container">
                      <div className="edit-row">
                        <label><strong>Raza: </strong></label>
                        <input type="text" name="breed" className="form-control mb-2" value={post.breed} onChange={handleInputChange} />
                      </div>

                      <div className="edit-row">
                        <label><strong>Color: </strong></label>
                        <input type="text" name="color" className="form-control mb-2" value={post.color} onChange={handleInputChange} />
                      </div>

                      <div className="edit-row">
                        <label><strong>Género: </strong></label>
                        <input type="text" name="gender" className="form-control mb-2" value={post.gender} onChange={handleInputChange} />
                      </div>

                      <div className="edit-row">
                        <label><strong>Edad: </strong></label>
                        <input type="text" name="age" className="form-control mb-2" value={post.age} onChange={handleInputChange} />
                      </div>

                      <div className="edit-row">
                        <label><strong>Tamaño: </strong></label>
                        <input type="text" name="size" className="form-control mb-2" value={post.size} onChange={handleInputChange} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="h4 adoption-header" style={{ color: "#333" }}><strong>{post.title}</strong></p>
                    <div className="edit-container">
                      <div className="edit-row">
                        <label><strong>Raza: </strong></label>
                        <span>{post.breed}</span>
                      </div>

                      <div className="edit-row">
                        <label><strong>Color: </strong></label>
                        <span>{post.color}</span>
                      </div>

                      <div className="edit-row">
                        <label><strong>Género: </strong></label>
                        <span>{post.gender}</span>
                      </div>

                      <div className="edit-row">
                        <label><strong>Edad: </strong></label>
                        <span>{post.age}</span>
                      </div>

                      <div className="edit-row">
                        <label><strong>Tamaño: </strong></label>
                        <span>{post.size}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 singlepost">
                {isEditing ? (
                  <>
                    <div className="edit-container">
                      <div className="edit-group">
                        <h4>Condición:</h4>
                        <textarea
                          name="petCondition"
                          className="form-control mb-2"
                          value={post.petCondition}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="edit-group">
                        <h4>Mensaje:</h4>
                        <textarea
                          name="ownerMessage"
                          className="form-control mb-2"
                          value={post.ownerMessage}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <button className="btn btn-success mt-3" onClick={handleUpdate}>Guardar cambios</button>
                    <button className="btn btn-secondary mt-3" onClick={handleCancelEdit}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <h4>Condición</h4>
                    <p>{post.petCondition}</p>
                    <h4>Mensaje</h4>
                    <p>{post.ownerMessage || 'No se proporcionó una descripción.'}</p>
                  </>
                )}
              </div>
            </div>

            {(isOwner || (userRole === "administrador")) && !isEditing && (
              <div className="text-center my-4">
                <button className="btn btn-warning" onClick={() => setIsEditing(true)}>Editar</button>
                <button className="btn btn-danger ml-2" onClick={handleDelete}>Eliminar</button>
              </div>
            )}
          </div>

          {/* Columna derecha */}
          <div className="col-lg-3 d-flex flex-column justify-content-start">
            <div className="card bg-light p-3 mb-3">
              <h5>Contacto</h5>
              {isEditing ? (
                <>
                  <div className="edit-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      name="ownerName"
                      className="form-control edit-field"
                      value={post.ownerName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="edit-group">
                    <label>Teléfono:</label>
                    <input
                      type="text"
                      name="ownerPhone"
                      className="form-control edit-field"
                      value={post.ownerPhone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="edit-group">
                    <label>Correo:</label>
                    <input
                      type="email"
                      name="ownerEmail"
                      className="form-control edit-field"
                      value={post.ownerEmail}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="edit-group">
                    <label>Recompensa:</label>
                    <input
                      type="text"
                      name="reward"
                      className="form-control edit-field"
                      value={post.reward}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              ) : (
                <>
                  <p>Nombre: <strong>{post.ownerName}</strong></p>
                  <p>Teléfono: <strong>{post.ownerPhone}</strong></p>
                  <p>Correo: <strong>{post.ownerEmail}</strong></p>
                  <p>Recompensa: <strong>{post.reward}</strong></p>
                  {/*<p>Mensaje: <strong>{ownerMessage}</strong></p>*/}
                </>
              )}
            </div>
            <div className="card bg-light p-3 text-center">
              <h5 className="mb-4">Opciones de compartir</h5>
              <div className="d-flex flex-column align-items-center">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(
                    `¡Mira esta publicación en Espaw Finder! "${post.title}" está disponible. Puedes ayudar o adoptarla aquí.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-block mb-2"
                  style={{ backgroundColor: '#3b5998', color: '#fff' }}
                >
                  <i className="fab fa-facebook mr-2"></i> Compartir en Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `¡Mira esta publicación en Espaw Finder! "${post.title}" está disponible. Ayuda o adopta desde aquí.`
                  )}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-block mb-2"
                  style={{ backgroundColor: '#1da1f2', color: '#fff' }}
                >
                  <i className="fab fa-twitter mr-2"></i> Compartir en Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `¡Mira esta publicación en Espaw Finder! "${post.title}" está disponible. Puedes ayudar o adoptarla aquí:\n\n${window.location.href}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-block mb-2"
                  style={{ backgroundColor: '#25d366', color: '#fff' }}
                >
                  <i className="fab fa-whatsapp mr-2"></i> Compartir en WhatsApp
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `¡Mira esta publicación en Espaw Finder!`
                  )}&body=${encodeURIComponent(
                    `Hola, encontré esta publicación en Espaw Finder: "${post.title}" está disponible para ayuda o adopción. Puedes verla aquí.`
                  )}`}
                  className="btn btn-block mb-2"
                  style={{ backgroundColor: '#6c757d', color: '#fff' }}
                >
                  <i className="fas fa-envelope mr-2"></i> Compartir por Email
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SinglePost;





