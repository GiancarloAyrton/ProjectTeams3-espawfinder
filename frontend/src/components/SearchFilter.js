import React, { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    breed: '',
    color: '',
    gender: '',
    location: '',
    healthStatus: '',
    dateRange: { from: '', to: '' },
    type: '',
    size: '',
    specialCondition: ''
  });

  const [searchTag, setSearchTag] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [name]: value
      }
    });
  };

  const handleTagChange = (e) => {
    setSearchTag(e.target.value);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (searchTag && !searchTags.includes(searchTag)) {
      const newTags = [...searchTags, searchTag];
      setSearchTags(newTags);
      setSearchTag('');
      onSearch({ ...filters, tags: newTags });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const newTags = searchTags.filter(tag => tag !== tagToRemove);
    setSearchTags(newTags);
    onSearch({ ...filters, tags: newTags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        {/* Campos de Filtro Existentes */}
        <div className="form-group">
          <label htmlFor="breed">Raza</label>
          <input type="text" className="form-control" id="breed" name="breed" value={filters.breed} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="text" className="form-control" id="color" name="color" value={filters.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Género</label>
          <select className="form-control" id="gender" name="gender" value={filters.gender} onChange={handleChange}>
            <option value="">Selecciona un género</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input type="text" className="form-control" id="location" name="location" value={filters.location} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="healthStatus">Estado de Salud</label>
          <input type="text" className="form-control" id="healthStatus" name="healthStatus" value={filters.healthStatus} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="dateRange">Rango de Fechas</label>
          <input type="date" className="form-control" id="from" name="from" value={filters.dateRange.from} onChange={handleDateChange} />
          <input type="date" className="form-control mt-2" id="to" name="to" value={filters.dateRange.to} onChange={handleDateChange} />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo de Mascota</label>
          <select className="form-control" id="type" name="type" value={filters.type} onChange={handleChange}>
            <option value="">Selecciona un tipo</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">Tamaño</label>
          <select className="form-control" id="size" name="size" value={filters.size} onChange={handleChange}>
            <option value="">Selecciona un tamaño</option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="specialCondition">Condición Especial</label>
          <input type="text" className="form-control" id="specialCondition" name="specialCondition" value={filters.specialCondition} onChange={handleChange} />
        </div>

        {/* Campo de Entrada para Tags de Búsqueda */}
        <div className="form-group">
          <label htmlFor="searchTag">Buscar y añadir Tag</label>
          <input
            type="text"
            className="form-control"
            id="searchTag"
            name="searchTag"
            value={searchTag}
            onChange={handleTagChange}
          />
          <button className="btn btn-primary mt-2" onClick={handleAddTag}>Añadir Tag</button>
        </div>

        {/* Mostrar Tags de Búsqueda */}
        <div className="tags-widget mt-3">
          {searchTags.map(tag => (
            <span key={tag} className="badge badge-pill badge-default">
              {tag} <button type="button" className="btn btn-sm btn-danger" onClick={() => handleRemoveTag(tag)}>x</button>
            </span>
          ))}
        </div>

        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
    </div>
  );
};

export default SearchFilter;
