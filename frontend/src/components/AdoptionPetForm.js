import React, { useState } from 'react';
import MapView from '../components/MapView';
import axios from 'axios';
import FilePreview from '../components/FilePreview';
import BASE_URL from '../api';
const AdoptionPetForm = () => {
  const getButtonText = () => {
    if (isPublished) return '¡Publicado con éxito!';
    if (isSubmitting) return 'Publicando...';
    return 'Publicar';
  };

  // Usage in your component:
  const [formData, setFormData] = useState({
    title: '',
    breed: '',
    type: '',
    color: '',
    gender: '',
    age: '',
    size: '',
    petCondition: '',
    lostOrFoundLocation: '',
    latitude: '',
    longitude: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    ownerMessage: '',
    files: [],
    status: 'adoption',
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Para manejar el estado de publicación
  const [isPublished, setIsPublished] = useState(false); // Para manejar el feedback de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData({
      ...formData,
      files: [...formData.files, ...newFiles]
    });
  };

  const handleFileRemove = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      files: newFiles
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const deviceId = localStorage.getItem('anonymousPostUUID');
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'files') {
        formData.files.forEach(file => {
          data.append('files', file);
        });
      } else {
        data.append(key, formData[key]);
      }
    });
    // Añadir el deviceId al FormData
    data.append('deviceId', deviceId);
    try {
      const response = await axios.post(`${BASE_URL}/upload`, data, { 
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
      setIsPublished(true);

      setTimeout(() => {
        window.location.href = `/post/${response.data.id}`;
      }, 2000);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsSubmitting(false); // Finaliza el estado de envío
    }
  };

  return (
    <div className='center-formulario'>
      <div className="mt-5 form-container">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className="row">
            <div className="col-md-7">
              <h3>Información de la Mascota</h3>
              <div className="form-group image-upload">
                <label htmlFor="media" className="video-label">
                  <FilePreview files={formData.files} onRemove={handleFileRemove} />
                  <div>Cargar imágenes o videos</div>
                  <div>MP4 hasta 50MB</div>
                </label>
                <input type="file" className="form-control-file" id="media" name="media" onChange={handleFileChange} multiple />
              </div>

              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input type="text" className={`form-control ${formData.title ? 'filled' : ''}`} id="title" name="title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="breed">Raza</label>
                    <input type="text" className={`form-control ${formData.breed ? 'filled' : ''}`} id="breed" name="breed" value={formData.breed} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="color">Color</label>
                    <input type="text" className={`form-control ${formData.color ? 'filled' : ''}`} id="color" name="color" value={formData.color} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="age">Edad</label>
                    <input type="text" className={`form-control ${formData.age ? 'filled' : ''}`} id="age" name="age" value={formData.age} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="petCondition">Condición de la Mascota</label>
                    <textarea className={`form-control ${formData.petCondition ? 'filled' : ''}`} id="petCondition" name="petCondition" value={formData.petCondition} onChange={handleChange} rows="3"></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="type">Tipo de Mascota</label>
                    <select className={`form-control ${formData.type ? 'filled' : ''}`} id="type" name="type" value={formData.type} onChange={handleChange}>
                      <option value="">Selecciona un tipo</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Género</label>
                    <select className={`form-control ${formData.gender ? 'filled' : ''}`} id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                      <option value="">Selecciona un género</option>
                      <option value="Macho">Macho</option>
                      <option value="Hembra">Hembra</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="size">Tamaño</label>
                    <select className={`form-control ${formData.size ? 'filled' : ''}`} id="size" name="size" value={formData.size} onChange={handleChange}>
                      <option value="">Selecciona un tamaño</option>
                      <option value="Pequeño">Pequeño</option>
                      <option value="Mediano">Mediano</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </div>

                  <input type="hidden" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} />
                  <input type="hidden" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} />
                </div>
              </div>

            </div>
            <div className="col-md-5">
              <h3>Datos del Dueño</h3>
              <div className="form-group">
                <label htmlFor="ownerName">Nombre</label>
                <input type="text" className={`form-control ${formData.ownerName ? 'filled' : ''}`} id="ownerName" name="ownerName" placeholder="Ej: Juan Pérez" value={formData.ownerName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="ownerPhone">Teléfono</label>
                <input type="text" className={`form-control ${formData.ownerPhone ? 'filled' : ''}`} id="ownerPhone" name="ownerPhone" placeholder="Ej: 555-1234" value={formData.ownerPhone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="ownerEmail">Correo Electrónico</label>
                <input type="email" className={`form-control ${formData.ownerEmail ? 'filled' : ''}`} id="ownerEmail" name="ownerEmail" placeholder="Ej: juan@ejemplo.com" value={formData.ownerEmail} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="ownerMessage">Mensaje</label>
                <textarea className={`form-control ${formData.ownerMessage ? 'filled' : ''}`} id="ownerMessage" name="ownerMessage" placeholder="Escribe un mensaje" value={formData.ownerMessage} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="lostOrFoundLocation">Ubicación</label>
            <input type="text" className={`form-control wide-input ${formData.lostOrFoundLocation ? 'filled' : ''}`} id="lostOrFoundLocation" name="lostOrFoundLocation" value={formData.lostOrFoundLocation} onChange={handleChange} />
          </div>
          <MapView setFormData={setFormData} /> {/* Añadir el componente MapView aquí */}

          <button
            type="submit"
            className={`btn btn-publicar ${isPublished ? 'btn-success' : 'btn-primary'}`}
            disabled={isSubmitting}
          >
            {getButtonText()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdoptionPetForm;