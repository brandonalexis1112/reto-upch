// src/components/organisms/UserList.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputAtom from '../../Input/InputA';
import UserCard from '../UserCard/UserCard';
import './UserList.css';

const UserList = ({ filter }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Para manejar la selección
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener los usuarios
    axios
      .get('https://randomuser.me/api/?results=5&nat=US&gender=female')
      .then((response) => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
      });
  }, []);

  useEffect(() => {
    // Filtros por búsqueda en tiempo real
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  useEffect(() => {
    // Aplicar los filtros seleccionados en nat y gender
    let filtered = users;

    if (filter.nat) {
      filtered = filtered.filter((user) => user.nat === filter.nat);
    }

    if (filter.gender) {
      filtered = filtered.filter((user) => user.gender === filter.gender);
    }

    setFilteredUsers(filtered);
  }, [filter, users]);

  const handleSelect = (user) => {
    // Selecciona el usuario, solo uno a la vez
    setSelectedUser(user);
  };

  const handleDelete = () => {
    // Eliminar el usuario seleccionado
    setFilteredUsers(filteredUsers.filter((u) => u !== selectedUser));
    setSelectedUser(null); // Desseleccionar el usuario después de eliminarlo
  };

  return (
    <div>
      {/* Búsqueda en tiempo real */}
      <InputAtom
        placeholder="Buscar usuario"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Mostrar el listado de usuarios */}
      {filteredUsers.map((user) => (
        <UserCard
          key={user.login.uuid}
          user={user}
          selected={selectedUser === user}
          onSelect={handleSelect}
        />
      ))}

      <p>Total de registros: {filteredUsers.length}</p>

      {/* Botón para eliminar el usuario seleccionado */}
      {selectedUser && (
        <button onClick={handleDelete}>
          Eliminar
        </button>
      )}
    </div>
  );
};

export default UserList;
