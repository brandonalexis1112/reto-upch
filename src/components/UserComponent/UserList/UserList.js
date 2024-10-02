import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ButtonAtom from '../../Button/ButtonA';
import EditForm from '../../EditForm/EditForm';
import InputAtom from '../../Input/InputA';
import UserCard from '../UserCard/UserCard';
import './UserList.css';

const UserList = ({ filter }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios
      .get('https://randomuser.me/api/?results=5&nat=US&gender=female')
      .then((response) => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
      });
  }, []);

  useEffect(() => {
    // Filtrado por búsqueda
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  useEffect(() => {
    // filtros de nacionalidad y género
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
    // Seleccionar el usuario
    setSelectedUser(user);
  };

  const handleEdit = () => {
    if (selectedUser) setShowEditModal(true);
  };

  const handleSaveChanges = (updatedUser) => {
   
    const updatedUsers = users.map((user) =>
      user.login.uuid === updatedUser.login.uuid ? updatedUser : user
    );
    setUsers(updatedUsers); 
    setFilteredUsers(updatedUsers); 
  };

  const handleDelete = () => {
    if (selectedUser) {
      
      const remainingUsers = users.filter((user) => user.login.uuid !== selectedUser.login.uuid);
      setUsers(remainingUsers);  
      setFilteredUsers(remainingUsers); 
      setSelectedUser(null);
    }
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

      {selectedUser && (
        <>
          <ButtonAtom label="Editar" onClick={handleEdit} />
          <ButtonAtom label="Eliminar" variant="danger" onClick={handleDelete} />
        </>
      )}

      {selectedUser && (
        <EditForm
          user={selectedUser}
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default UserList;
