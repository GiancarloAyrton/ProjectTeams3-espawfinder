import React, { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validación extra de seguridad en el cliente
    if (formData.password.length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    axios.post(`${BASE_URL}/users/login`, formData)
      .then(response => {
        console.log('Login exitoso:', response.data);
        handleLogin(response.data.token);
        window.location.href = '/'; // Redirigir al home
      })
      .catch(error => {
        if (error.response) {
          setErrorMessage(error.response.data.message);
          console.error('Error al iniciar sesión:', error.response.data.message);
        } else if (error.request) {
          setErrorMessage('No se recibió respuesta del servidor');
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          setErrorMessage('Error al configurar la solicitud');
          console.error('Error al configurar la solicitud:', error.message);
        }
      });
  };

  return (
    <div className="d-flex justify-content-center" style={{ paddingTop: '200px' }}>
      <div className="p-4 rounded shadow bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
