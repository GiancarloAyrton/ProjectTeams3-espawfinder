import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';

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

    // 🔒 Validación de seguridad para contraseña
    if (formData.password.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      setLoading(false);
      return;
    }

    // Obtener el UUID desde localStorage
    const deviceId = localStorage.getItem('anonymousPostUUID');

    const registerData = {
      username: formData.name,
      email: formData.email,
      password: formData.password,
      deviceId
    };

    try {
      const response = await axios.post(`${BASE_URL}/users/register`, registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage('Registro exitoso. ¡Bienvenido!');
      console.log('Registro exitoso:', response.data);

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      setErrorMessage('Error al registrar. Por favor, intenta nuevamente.');
      console.error('Error al registrar:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: '200px' }}>
      <div className="p-4 rounded shadow bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
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
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8} // ✅ validación HTML
              required
            />
          </div>
          {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
