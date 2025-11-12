import { Home, Search, PlusSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({ setIsOPenNewPostModal }) {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">
            Instagram
          </Link>
          <div className="icons">
            <Link to="/">
              <Home />
            </Link>
            <Link to="/search">
              <Search />
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
          </div>
        </div>
      </nav>
    </header>
  )
}
