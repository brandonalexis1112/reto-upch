import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonAtom from "../../Button/ButtonA";
import EditForm from "../../EditForm/EditForm";
import InputAtom from "../../Input/InputA";
import UserCard from "../UserCard/UserCard";
import "./UserList.css";

const UserList = ({ filter }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=5&nat=US&gender=female")
      .then((response) => {
        setUsers(response.data.results);
        setFilteredUsers(response.data.results);
      });
  }, []);

  useEffect(() => {
    // Filtrado por búsqueda
    const filtered = users.filter((user) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(search.toLowerCase())
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
      const remainingUsers = users.filter(
        (user) => user.login.uuid !== selectedUser.login.uuid
      );
      setUsers(remainingUsers);
      setFilteredUsers(remainingUsers);
      setSelectedUser(null);
    }
  };

  return (
    <div className="col-sm-12 pt-4">
      <div className="card border rounded-2 ">
        <div className="card-header py-3">
          <div className=" fl ">
            {selectedUser && (
              <>
                <ButtonAtom
                  label="Editar"
                  icon="bi-pencil"
                  onClick={handleEdit}
                />

                <ButtonAtom
                  label="Eliminar"
                  icon="bi-trash3"
                  variant="outline-danger px-4 me-2"
                  onClick={handleDelete}
                />
              </>
            )}
          </div>
        </div>
        <InputAtom
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="col-sm-12 ">
          <tr className="user-card fs">
            <th scope="col" className="pl-1">
              <i class="bi bi-check-lg"></i>
            </th>
            <th scope="col " className="pl-2">
              Foto
            </th>
            <th scope="col " className="pl-3">
              Nombre
            </th>
            <th scope="col " className="pl-4">
              Genero
            </th>
            <th scope="col" className="pl-5">
              Dirección
            </th>
            <th scope="col" className="pl-6">
              Teléfono
            </th>
            <th scope="col" className="pl-7">
              Correo electrónico
            </th>
            <th scope="col" className="pl-8">
              País
            </th>
          </tr>
        </div>
        {filteredUsers.map((user) => (
          <UserCard
            key={user.login.uuid}
            user={user}
            selected={selectedUser === user}
            onSelect={handleSelect}
          />
        ))}

        <p className="p-footer">Registros: {filteredUsers.length}</p>

        {selectedUser && (
          <EditForm
            user={selectedUser}
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            onSave={handleSaveChanges}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
