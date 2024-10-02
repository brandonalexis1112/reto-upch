import React, { useState } from 'react';
import ButtonAtom from '../components/Button/ButtonA';
import FilterForm from '../components/FilterForm/FilterForm';
import UserList from '../components/UserComponent/UserList/UserList';
import './Home.css';

const Home = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({ nat: '', gender: '' });

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible); 
  };

  const handleFilter = (nat, gender) => {
    setFilter({ nat, gender });
  };

  const handleClearFilters = () => {
    setFilter({ nat: '', gender: '' }); 
  };

  return (
    <div className="home">
      <h1 className="title">Listado de Usuarios</h1>

      <ButtonAtom label="Filtros" onClick={toggleFilterVisibility} />

      {filterVisible && (
        <div className="filter-box">
          <FilterForm onFilter={handleFilter} />
          <ButtonAtom label="Limpiar Filtros" onClick={handleClearFilters} />
        </div>
      )}

      <UserList filter={filter} />
    </div>
  );
};

export default Home;
