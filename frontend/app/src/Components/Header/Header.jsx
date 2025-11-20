import { useState } from 'react'
import {
  Home,
  PlusSquare,
  User,
  Settings,
  LogOut,
  CircleUser,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { SearchBoard } from '../SearchBoard/SearchBoard'
import { SearchName } from '../SearchName/SearchName'
import './Header.css'
import Logo from '../Logo/Logo'

export default function Header({ setIsOPenNewPostModal, logOut }) {
  const [users, setUsers] = useState([])
  const token = localStorage.token

  return (
    <header className="Header">
      <div className="Header-container">
        <nav className="Header-navbar">
          {/* Logo */}
          <Link to="/" className="logo">
            <Logo />
          </Link>

          {/* Buscador */}
          <SearchBoard setUsers={setUsers} />

          {/* Iconos */}
          <div className="Header-icons">
            {token ? (
              <>
                <Link to="/">
                  <Home />
                </Link>
                <div
                  onClick={() => setIsOPenNewPostModal(true)}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  <PlusSquare />
                </div>
                <Link to="/profile">
                  <User />
                </Link>
                <div>
                  <Link to="/settings">
                    <Settings style={{ color: 'black' }} />
                  </Link>
                </div>

                <div onClick={logOut} style={{ cursor: 'pointer' }}>
                  <LogOut />
                </div>
              </>
            ) : (
              <Link to="/login">
                <CircleUser />
              </Link>
            )}
          </div>
        </nav>

        {users.map(user => (
          <SearchName key={user._id} user={user} />
        ))}
      </div>
    </header>
  )
}
