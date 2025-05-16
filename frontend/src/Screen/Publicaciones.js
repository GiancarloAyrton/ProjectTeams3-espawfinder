import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './../components/PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import Preloader from '../components/Preloader';
import '../css/Publicaciones.css'

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://espawfinder.com/backend/upload/all');
        if (response.data.files) {
          setAllPosts(response.data.files);
          setDisplayedPosts(response.data.files.slice(0, 10));
          setHasMore(response.data.files.length > 10);
        } else {
          console.error('No files found in response:', response.data);
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchPosts();
    }, []);

    useEffect(() => {
      filterPosts();
    }, [filter, allPosts, searchTags]);

    const filterPosts = () => {
      const newFilteredPosts = allPosts.filter(post => {
        if (filter.type !== 'todos' && post.type?.toLowerCase() !== filter.type) return false;
        if (filter.category !== 'todos' && post.status?.toLowerCase() !== filter.category) return false;
        // Filtrado por etiquetas de búsqueda
        for (let tag of searchTags) {
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
      const newFilteredPosts = allPosts.filter(post => {
        // Filtrado por tipo de mascota (opcional)
        if (filter.type !== 'todos' && post.type?.toLowerCase() !== filter.type) {
          return false;
        }
        // Filtrado por categoría (status) (opcional)
        if (filter.category !== 'todos' && post.status?.toLowerCase() !== filter.category) {
          return false;
        }
        // Filtrado por etiquetas de búsqueda
        for (let tag of searchTags) {
          if (
            !post.breed?.toLowerCase().includes(tag) &&
            !post.color?.toLowerCase().includes(tag) &&
            !post.location?.toLowerCase().includes(tag) &&
            !post.healthStatus?.toLowerCase().includes(tag)
          ) {
            return false;
          }
        }
        return true;
      });

      const morePosts = newFilteredPosts.slice((newPage - 1) * 10, newPage * 10);
      setDisplayedPosts(prevPosts => [...prevPosts, ...morePosts]);
      setPage(newPage);
      setHasMore(newFilteredPosts.length > newPage * 10);
    };


    const handleFilterChange = (filterType, value) => {
      setFilter(prevFilter => ({ ...prevFilter, [filterType]: value }));
    };


    useEffect(() => {
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          // Ocultar si el usuario hace scroll hacia abajo
          setShowNav(false);
        } else {
          // Mostrar si el usuario hace scroll hacia arriba
          setShowNav(true);
        }
        lastScrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
              />
              <span className="input-group-btn">
                <button className="btn btn-secondary btn-sm" type="button" onClick={() => setSearchTags([...searchTags, searchTag])}>
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
                    <PostCard key={post._id.$oid} post={post} />
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








