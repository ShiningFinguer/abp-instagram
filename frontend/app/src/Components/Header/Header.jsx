import { Home, Search, PlusSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom'
import './Header.css'
import React, { useState } from "react";
import { useEffect } from "react";
import { SearchBoard } from '../SearchBoard/SearchBoard';
import { SearchName } from '../SearchName/SearchName';

export default function Header() {
  const [Users, setUsers] = useState([]);
  const [isSearching, setisSearching] = useState(false);
  const manejarUsuarios = (Usuarios) => {
    setUsers(Usuarios);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">Instagram</Link>
          <SearchBoard onCambio={manejarUsuarios}/>
          <div className="icons">
            <Link to="/"><Home/></Link>
            <Link to="/search"><Search/></Link>
            <Link to="/create"><PlusSquare/></Link>
            <Link to="/profile"><User/></Link>
          </div>
        </div>
        {Users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
        <div>
        </div>
      </nav>
    </header>
  )
}