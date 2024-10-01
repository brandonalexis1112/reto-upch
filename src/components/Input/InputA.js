import React from 'react';
import './InputA.css';

const InputAtom = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    className="form-control"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default InputAtom;
