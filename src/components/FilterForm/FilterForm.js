import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import ButtonAtom from "../Button/ButtonA";
import "./FilterForm.css";


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    className="btn custom-dropdown-toggle" 
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children} <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%230b5ed7' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E"
              alt="Imagen Externa"
            />
  </button>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);

const FilterForm = ({ onFilter }) => {
  const [nat, setNat] = useState("");
  const [gender, setGender] = useState("");

  const handleSearch = () => {
    onFilter(nat, gender);
  };

  return (
    <div className="filter-form">
      <Dropdown className="col-sm-12 col-lg-4">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {nat || "Nacionalidad"}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1" onClick={() => setNat("US")}>US</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => setNat("GB")}>GB</Dropdown.Item>
          <Dropdown.Item eventKey="3" onClick={() => setNat("FR")}>FR</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="col-sm-12 col-lg-4">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          {gender || "Género"}
        </Dropdown.Toggle>
        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="1" onClick={() => setGender("female")}>Female</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => setGender("male")}>Male</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="col-sm-12 col-lg-2"> 
        <ButtonAtom label="Buscar" icon="bi-search" onClick={handleSearch} />
      </div>
    </div>
  );
};

export default FilterForm;
