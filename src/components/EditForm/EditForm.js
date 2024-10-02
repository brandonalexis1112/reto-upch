import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import ButtonAtom from '../Button/ButtonA';
import './EditForm.css';

const EditForm = ({ user, show, handleClose, onSave }) => {
  const [name, setName] = useState(user.name.first + " " + user.name.last);
  const [gender, setGender] = useState(user.gender);
  const [location, setLocation] = useState(user.location.street.name + ", " + user.location.city);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState(user.location.country);

  
  const handleSaveChanges = (e) => {
    e.preventDefault();  
    
    const updatedUser = {
      ...user,
      name: { ...user.name, first: name.split(" ")[0], last: name.split(" ")[1] || "" },
      gender,
      location: { ...user.location, street: { ...user.location.street, name: location.split(",")[0] }, city: location.split(",")[1].trim() },
      phone,
      email,
      location: { ...user.location, country }
    };
    onSave(updatedUser); 
    handleClose();  
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Editar Usuario</Modal.Title>
        <button type="button" className="close" aria-label="Close" onClick={handleClose}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSaveChanges}>
          <Form.Group controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formGender">
            <Form.Label>Género</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formLocation">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formCountry">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>
          <ButtonAtom label="Guardar Cambios" onClick={handleSaveChanges} />
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditForm;
