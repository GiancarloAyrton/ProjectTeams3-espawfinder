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
    axios.post(`${BASE_URL}/users/login`, formData)
      .then(response => {
        console.log('Login exitoso:', response.data);
        handleLogin(response.data.token);
        window.location.href = '/'; // Redirigir al home
      })
      .catch(error => {
        if (error.response) {
          // La solicitud fue hecha y el servidor respondió con un código de estado
          // que cae fuera del rango de 2xx
          setErrorMessage(error.response.data.message);
          console.error('Error al iniciar sesión:', error.response.data.message);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          setErrorMessage('No se recibió respuesta del servidor');
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          // Algo pasó al configurar la solicitud que desencadenó un error
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
