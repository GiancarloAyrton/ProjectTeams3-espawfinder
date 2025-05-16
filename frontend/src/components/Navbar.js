import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, handleLogout }) => {
  return (
    <nav id="main-nav" className="navbar-expand-xl fixed-top">
      <div className="navbar container-fluid">
        <div className="container">
          {/* logo */}
          <a className="nav-brand" href="/">
            <img src="/img/logo.png" alt="" className="img-fluid" />
          </a>
          {/* Navbartoggler */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggle-icon">
              <i className="fas fa-bars"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {/* menu item */}
              <li className="nav-item active">
                <a className="nav-link" href="/">Home</a>
              </li>
              {/* menu items for dropdowns */}
              <li className="nav-item dropdown">
                <a className="nav-link" href="/posts">Publicaciones</a>
              </li>
              {/* Dropdown 1 
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="services-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Servicios</a>
                <div className="dropdown-menu pattern2" aria-labelledby="services-dropdown">
                  <a className="dropdown-item" href="services.html">Services Style 1</a>
                  <a className="dropdown-item" href="services2.html">Services Style 2</a>
                  <a className="dropdown-item" href="services-single.html">Services Single</a>
                </div>
              </li>
              {/* Dropdown 2 */}
              <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="adopt-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Adopta
                        </a>
                        <div class="dropdown-menu pattern2" aria-labelledby="adopt-dropdown">
                           <a class="dropdown-item" href="adoption.html">Adoption Gallery</a>
                           <a class="dropdown-item" href="adoption-single.html">Adoption Single Page</a>
                           <a class="dropdown-item" href="adoption-stories.html">Adoption Stories</a>
                           <a class="dropdown-item" href="events.html">Events</a>
                           <a class="dropdown-item" href="event-single.html">Events Single Page</a>
                        </div>
                </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="about-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sobre Nosotros</a>
                <div className="dropdown-menu pattern2" aria-labelledby="about-dropdown">
                  <a className="dropdown-item" href="about.html">About Style 1</a>
                  <a className="dropdown-item" href="about2.html">About Style 2</a>
                  <a className="dropdown-item" href="team.html">Our Team</a>
                  <a className="dropdown-item" href="team-single.html">Team Single Page</a>
                  <a className="dropdown-item" href="careers.html">Careers</a>
                </div>
              </li>
                     {/*
                     <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="gallery-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Galeria
                        </a>
                        <div class="dropdown-menu pattern2" aria-labelledby="gallery-dropdown">
                           <a class="dropdown-item" href="gallery.html">Gallery Style 1</a>
                           <a class="dropdown-item" href="gallery2.html">Gallery Style 2</a>
                        </div>
                     </li>
                     
                     <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="contact-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Contacto
                        </a>
                        <div class="dropdown-menu pattern2" aria-labelledby="contact-dropdown">
                           <a class="dropdown-item" href="contact.html">Contact Style 1</a>
                           <a class="dropdown-item" href="contact2.html">Contact Style 2</a>
                           <a class="dropdown-item" href="contact3.html">Contact Style 3</a>
                        </div>
                     </li>
                     */}
                     <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="others-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Otras paginas
                        </a>
                        <div class="dropdown-menu pattern2" aria-labelledby="others-dropdown">
                           <a class="dropdown-item" href="blog.html">Blog Home 1</a>
                           <a class="dropdown-item" href="blog2.html">Blog Home 2</a>
                           <a class="dropdown-item" href="blog-single.html">Blog Single</a>
                           <a class="dropdown-item" href="elements.html">Elements Page</a>
                           <a class="dropdown-item" href="404.html">404 Page</a>
                        </div>
                     </li>
                     {isAuthenticated ? (
                      <>
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle" href="#" id="profile-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Perfil
                          </a>
                          <div className="dropdown-menu pattern2" aria-labelledby="profile-dropdown">
                            <Link className="dropdown-item" to="/profile">Ver Perfil</Link>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/" onClick={handleLogout}>Cerrar Sesión</a>
                          </div>
                        </li>
                      </>
                      ) : (
                        <>
                        <li className="nav-item active">
                          <a className="nav-link" href="/login">login</a>
                        </li>
                        <li className="nav-item active">
                          <a className="nav-link" href="/register">Register</a>
                        </li>
                        </>
                     )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
