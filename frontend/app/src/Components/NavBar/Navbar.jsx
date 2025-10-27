// Navbar.jsx
import React from 'react';
import { Home, Search, PlusSquare, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <a href="/home" className="logo">
          Instagram
        </a>
        <div className="icons">
          <a href="/home"><Home/></a>
          <a href="/search"><Search/></a>
          <a href="/create"><PlusSquare/></a>
          <a href="/profile"><User/></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
