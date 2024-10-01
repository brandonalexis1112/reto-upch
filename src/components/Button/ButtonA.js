import React from 'react';
import './ButtonA.css';

const ButtonAtom = ({ label, onClick }) => (
  <button className="btn btn-primary" onClick={onClick}>
    {label}
  </button>
);

export default ButtonAtom;
