import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InputAtom from '../../Input/InputA';
import UserCard from '../UserCard/UserCard';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener los usuarios
    axios
      .get('https://randomuser.me/api/?results=5&gender=female&nat=US')
      .then((response) => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
      });
  }, []);

  useEffect(() => {
    // Filtrar usuarios en tiempo real
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleSelect = (user) => setSelectedUser(user);

  const handleDelete = () => {
    setFilteredUsers(filteredUsers.filter((u) => u !== selectedUser));
    setSelectedUser(null);
  };

  return (
    <div>
      <InputAtom
        placeholder="Buscar usuario"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredUsers.map((user) => (
        <UserCard
          key={user.login.uuid}
          user={user}
          selected={selectedUser === user}
          onSelect={handleSelect}
        />
      ))}
      <p>Total de registros: {filteredUsers.length}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default UserList;
