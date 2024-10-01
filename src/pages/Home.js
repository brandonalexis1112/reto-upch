import React, { useState } from 'react';
import ButtonAtom from '../components/Button/ButtonA';
import FilterForm from '../components/FilterForm/FilterForm';
import UserList from '../components/UserComponent/UserList/UserList';
import './Home.css';

const Home = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({ nat: '', gender: '' });

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible); // Muestra u oculta la caja de filtros
  };

  const handleFilter = (nat, gender) => {
    setFilter({ nat, gender });
  };

  const handleClearFilters = () => {
    setFilter({ nat: '', gender: '' }); // Restablecer los filtros
  };

  return (
    <div className="home">
      <h1 className="title">Listado de Usuarios</h1>

      {/* Botón para mostrar/ocultar la caja de filtros */}
      <ButtonAtom label="Filtros" onClick={toggleFilterVisibility} />

      {/* Caja de filtros que se oculta o muestra según el estado */}
      {filterVisible && (
        <div className="filter-box">
          <FilterForm onFilter={handleFilter} />
          <ButtonAtom label="Limpiar Filtros" onClick={handleClearFilters} />
        </div>
      )}

      {/* Lista de usuarios con los filtros aplicados */}
      <UserList filter={filter} />
    </div>
  );
};

export default Home;
