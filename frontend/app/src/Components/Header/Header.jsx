import React, { useState } from 'react'
import { Home, Search, PlusSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBoard } from '../SearchBoard/SearchBoard'
import { SearchName } from '../SearchName/SearchName'
import './Header.css'

export default function Header() {
  const [Users, setUsers] = useState([])
  const [isSearching, setisSearching] = useState(false)
  const manejarUsuarios = Usuarios => {
    setUsers(Usuarios)
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          {/* Logo */}
          <Link to="/" className="logo">
            Instagram
          </Link>

          {/* Buscador */}
          <SearchBoard onCambio={manejarUsuarios} />

          {/* Iconos */}
          <div className="icons">
            <Link to="/">
              <Home />
            </Link>
            <Link to="/search">
              <Search />
            </Link>
            <Link to="/create">
              <PlusSquare />
            </Link>
            <Link to="/profile">
              <User />
            </Link>
          </div>
        </div>

        {Users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
      </nav>
    </header>
  )
}
