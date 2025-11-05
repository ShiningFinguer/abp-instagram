import { Home, Search, PlusSquare, User } from 'lucide-react';
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <Link to="/" className="logo">Instagram</Link>
          <div className="icons">
            <Link to="/"><Home/></Link>
            <Link to="/search"><Search/></Link>
            <Link to="/create"><PlusSquare/></Link>
            <Link to="/profile"><User/></Link>
          </div>
        </div>
      </nav>
    </header>
  )
}