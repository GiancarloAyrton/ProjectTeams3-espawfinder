// Register.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    // Obtener el UUID desde localStorage
    const deviceId = localStorage.getItem('anonymousPostUUID');

    const registerData = {
      nombre: formData.name,
      email: formData.email,
      password: formData.password,
      deviceId // Enviar el deviceId para actualizar las publicaciones anónimas
    };

    try {
      const response = await axios.post('https://espawfinder.com/backend/users/register', registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage('Registro exitoso. ¡Bienvenido!');
      console.log('Registro exitoso:', response.data);

      // Redirigir al usuario después del registro
      setTimeout(() => {
        window.location.href = '/dashboard'; // Cambia la ruta según sea necesario
      }, 2000);

    } catch (error) {
      setErrorMessage('Error al registrar. Por favor, intenta nuevamente.');
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default Register;
