import React, { useState } from 'react';
import FilterForm from '../components/FilterForm/FilterForm';
import UserList from '../components/UserComponent/UserList/UserList';
import './Home.css';

const Home = () => {
  const [filter, setFilter] = useState({ nat: '', gender: '' });

  const handleFilter = (nat, gender) => {
    setFilter({ nat, gender });
  };

  return (
    <div className="home">
      <h1 className="title">Listado de Usuarios</h1>
      <FilterForm onFilter={handleFilter} />
      <UserList filter={filter} />
    </div>
  );
};

export default Home;
