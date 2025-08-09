import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import PostCard from '../components/PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Preloader from '../components/Preloader';
import '../css/Publicaciones.css'
import BASE_URL from '../api';

const Posts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ type: 'todos', category: 'todos' });
  const [loading, setLoading] = useState(true);
  const [searchTag, setSearchTag] = useState('');
  const [searchTags, setSearchTags] = useState([]);
  const [activeTab, setActiveTab] = useState('main'); // main, left, right
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(null);

  const token = localStorage.getItem('token');

  // ✅ Decodificar token SOLO después del render y cuando cambie
  useEffect(() => {
    if (!token) {
      setAuthenticatedUserId(null);
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setAuthenticatedUserId(String(decoded.id));
    } catch (err) {
      console.error('❌ Error al decodificar el token:', err);
      setAuthenticatedUserId(null);
    }
  }, [token]); 
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const fetchPosts = async (userId) => {
    if (!userId) return; // guard
    try {
      const response = await axios.get(`${BASE_URL}/upload/allP/${userId}`);
      console.log('📥 Respuesta cruda:', response.data);
      if (response.data.files) {
        setAllPosts(response.data.files);
        setDisplayedPosts(response.data.files.slice(0, 10));
        setHasMore(response.data.files.length > 10);
      } else {
        console.error('No files found in response:', response.data);
        setAllPosts([]);
        setDisplayedPosts([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setAllPosts([]);
      setDisplayedPosts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cargar posts solo cuando ya tenemos authenticatedUserId
  useEffect(() => {
    setLoading(true);
    fetchPosts(authenticatedUserId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticatedUserId]);

  useEffect(() => {
    filterPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, allPosts, searchTags]);

  const filterPosts = () => {
    const tags = searchTags.map(t => t.toLowerCase());
    const newFilteredPosts = allPosts.filter(post => {
      if (filter.type !== 'todos' && post.type?.toLowerCase() !== filter.type) return false;
      if (filter.category !== 'todos' && post.status?.toLowerCase() !== filter.category) return false;

      // Filtrado por etiquetas de búsqueda
      for (let tag of tags) {
        if (
          !post.breed?.toLowerCase().includes(tag) &&
          !post.color?.toLowerCase().includes(tag) &&
          !post.location?.toLowerCase().includes(tag) &&
          !post.healthStatus?.toLowerCase().includes(tag)
        ) return false;
      }
      return true;
    });

    setDisplayedPosts(newFilteredPosts.slice(0, 10));
    setHasMore(newFilteredPosts.length > 10);
    setPage(1);
  };

  const fetchMoreData = () => {
    const newPage = page + 1;

    const tags = searchTags.map(t => t.toLowerCase());
    const newFilteredPosts = allPosts.filter(post => {
      if (filter.type !== 'todos' && post.type?.toLowerCase() !== filter.type) return false;
      if (filter.category !== 'todos' && post.status?.toLowerCase() !== filter.category) return false;
      for (let tag of tags) {
        if (
          !post.breed?.toLowerCase().includes(tag) &&
          !post.color?.toLowerCase().includes(tag) &&
          !post.location?.toLowerCase().includes(tag) &&
          !post.healthStatus?.toLowerCase().includes(tag)
        ) return false;
      }
      return true;
    });

    const morePosts = newFilteredPosts.slice((newPage - 1) * 10, newPage * 10);
    setDisplayedPosts(prev => [...prev, ...morePosts]);
    setPage(newPage);
    setHasMore(newFilteredPosts.length > newPage * 10);
  };

  const handleFilterChange = (filterType, value) => {
    setFilter(prev => ({ ...prev, [filterType]: value }));
  };

  // ✅ Scroll show/hide navbar
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Evitar agregar tags vacíos/duplicados
  const addSearchTag = () => {
    const t = searchTag.trim().toLowerCase();
    if (!t) return;
    setSearchTags(prev => (prev.includes(t) ? prev : [...prev, t]));
    setSearchTag('');
  };

  return (
    <div className="wrapper">
      <div className="container mt-4 main-container">
        {/* Columna Izquierda - Búsqueda y Filtros */}
        <div className={`sidebar col-lg-3 card bg-light p-3 ${activeTab === 'left' ? '' : 'd-none d-lg-block'}`}>
          <h5 className="sidebar-header">Buscar</h5>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar publicaciones..."
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSearchTag()}
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary btn-sm" type="button" onClick={addSearchTag}>
                Buscar
              </button>
            </span>
          </div>

          <h5 className="sidebar-header">Categoría</h5>
          <div className="btn-group-vertical w-100">
            <button
              className={`btn ${filter.category === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('category', 'todos')}
            >
              Todas
            </button>
            <button
              className={`btn ${filter.category === 'lost' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('category', 'lost')}
            >
              Perdidos
            </button>
            <button
              className={`btn ${filter.category === 'found' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('category', 'found')}
            >
              Adoptados
            </button>
            <button
              className={`btn ${filter.category === 'solidarityhelp' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('category', 'solidarityhelp')}
            >
              Ayuda Solidaria
            </button>
            <button
              className={`btn ${filter.category === 'lookingformate' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('category', 'lookingformate')}
            >
              Busca Pareja
            </button>
          </div>

          <h5 className="sidebar-header mt-4">Tipo de Mascota</h5>
          <div className="btn-group-vertical w-100">
            <button
              className={`btn ${filter.type === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('type', 'todos')}
            >
              Todas
            </button>
            <button
              className={`btn ${filter.type === 'perro' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('type', 'perro')}
            >
              Perros
            </button>
            <button
              className={`btn ${filter.type === 'gato' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange('type', 'gato')}
            >
              Gatos
            </button>
          </div>
        </div>

        {/* Columna Central - Publicaciones */}
        <div className={`main-content col-lg-6 ${activeTab === 'main' ? '' : 'd-none d-lg-block'}`}>
          {loading ? (
            <Preloader />
          ) : (
            <InfiniteScroll
              dataLength={displayedPosts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<p>Loading...</p>}
              endMessage={<p>No hay más publicaciones.</p>}
            >
              <div className="posts-container">
                {displayedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>

        {/* Columna Derecha - Destacados */}
        <div className={`sidebar col-lg-3 card bg-light p-3 ${activeTab === 'right' ? '' : 'd-none d-lg-block'}`}>
          <h5 className="sidebar-header">Destacados</h5>
          <ul className="list-unstyled">
            <li>🐶 Perro adoptado recientemente</li>
            <li>🐱 Gato en tendencia</li>
            <li>🐰 Conejo rescatado</li>
          </ul>
          <h5 className="sidebar-header mt-3">Estadísticas rápidas</h5>
          <ul className="list-unstyled">
            <li>✅ 100 animales adoptados este mes</li>
            <li>🔍 50 mascotas perdidas encontradas</li>
            <li>📋 200 nuevas publicaciones hoy</li>
          </ul>
        </div>
      </div>

      {/* Barra Inferior para Móviles */}
      {isMobile && showNav && (
        <div className={`bottom-nav ${showNav ? 'visible' : 'hidden'}`}>
          <button className={activeTab === 'left' ? 'active' : ''} onClick={() => handleTabChange('left')}>
            <span>🔍</span>
            Buscar
          </button>
          <button className={activeTab === 'main' ? 'active' : ''} onClick={() => handleTabChange('main')}>
            <span>📰</span>
            Publicaciones
          </button>
          <button className={activeTab === 'right' ? 'active' : ''} onClick={() => handleTabChange('right')}>
            <span>⭐</span>
            Destacados
          </button>
        </div>
      )}
    </div>
  );
};

export default Posts;
