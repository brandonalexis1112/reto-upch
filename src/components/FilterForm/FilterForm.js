import React, { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ButtonAtom from '../Button/ButtonA';

const FilterForm = ({ onFilter }) => {
  const [nat, setNat] = useState('');
  const [gender, setGender] = useState('');

  return (
    <div className="filter-form">
      <DropdownButton title={nat || 'Nacionalidad'}>
        <Dropdown.Item onClick={() => setNat('US')}>US</Dropdown.Item>
        <Dropdown.Item onClick={() => setNat('GB')}>GB</Dropdown.Item>
      </DropdownButton>
      <DropdownButton title={gender || 'Género'}>
        <Dropdown.Item onClick={() => setGender('female')}>Female</Dropdown.Item>
        <Dropdown.Item onClick={() => setGender('male')}>Male</Dropdown.Item>
      </DropdownButton>
      <ButtonAtom label="Buscar" onClick={() => onFilter(nat, gender)} />
    </div>
  );
};

export default FilterForm;
