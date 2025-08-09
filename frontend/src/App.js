import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen'
import Navbar from './components/Navbar';
import Formulario from './Screen/Formulario';
import PostsScreen from './Screen/Publicaciones';
import PostUser from './Screen/PublicacionesUser';
import SinglePost from './Screen/SinglePost';
import Register from './Screen/Register';
import Login from './Screen/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/formulario" element={<Formulario />} />
        <Route path="/posts" element={<PostsScreen />} />
        <Route path="/postsUser/" element={<PostUser />} />  
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
