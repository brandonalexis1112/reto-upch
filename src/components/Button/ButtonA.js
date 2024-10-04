import React from 'react';
import './ButtonA.css';

const ButtonAtom = ({ label, onClick, variant = "outline-primary px-4 me-2", icon }) => (
  <button className={`btn btn-${variant}`} onClick={onClick}>
    {icon && <i className={`bi ${icon} me-2`}></i>}
    {label}
  </button>
);

export default ButtonAtom;
