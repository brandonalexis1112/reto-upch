import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import "./Header.css";

const Headers = () => {
    return (
      <Navbar bg="dark" data-bs-theme="dark" className="header">
          <div className="logo mx-auto">
            <img
              src="https://logo.clearbit.com/clearbit.com"
              alt="Imagen Externa"
            />
        </div>
        </Navbar>
    )

};

export default Headers;