import React, { useState } from 'react';
import "./header.css"

const Header = () => {
  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <div className="container">
    
    <p onClick={toggleNav}>button</p>
      {isNavVisible && (
        <nav className="nav">
          <br></br>
          <li>Button 1</li>
          <li>Button 2</li>
          <li>Button 3</li>
        </nav>
      )}
    </div>
  );
};

export default Header;
