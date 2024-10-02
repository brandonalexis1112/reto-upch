import React from 'react';
import './ButtonA.css';

const ButtonAtom = ({ label, onClick, variant = "primary" }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {label}
  </button>
);

export default ButtonAtom;
