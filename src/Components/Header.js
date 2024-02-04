// Header.js
import React, { useState } from 'react';
 import './header.css'; // Import the CSS file for styling
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Header = () => {


    const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (menuItem) => {
    setAnchorEl(null);

   
  };

const changepass = ()=>{
  
    navigate('/changepass')
}
const logout = () => {
  localStorage.clear();
  navigate('/');
}

const booklist = ()=>{
  
  navigate('/table')
}

const bookcart = ()=>{
  
  navigate('/book-list')
}
const newbook = ()=>{
  
  navigate('/add-book')
}



  return (
    <div className="header">
      <div className="logo-container">
        <span className="logo-text">Books Store</span>
      </div>
      <div className="account-icon-container">
        <button
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <AccountCircleIcon className="account-icon" />
        </button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={() => handleMenuClose(null)} // Passing null to indicate no specific menu item clicked
        >
          <MenuItem onClick={changepass}>Profile</MenuItem>
          <MenuItem onClick={newbook}>Create Book</MenuItem>
          <MenuItem onClick={booklist }>BooksTable</MenuItem>
          <MenuItem onClick={bookcart}>BooksCart</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;