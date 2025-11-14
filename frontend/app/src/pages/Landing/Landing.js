import { Link } from 'react-router-dom'
import './Landing.css'
import Logo from '../../Components/Logo/Logo'

export default function Landing() {
  return (
    <div className="Landing">
      <main className="Landing-main">
        <img className="Landing-img" src="/landing.png" />

        <form style={{ textAlign: 'center' }}>
          <Logo />
          <input type="text" />
          <input type="text" />
          <button>Iniciar sesión</button>
        </form>
      </main>

      <footer className="Landing-footer">
        <nav className="Landing-nav">
          <a href="#">Meta</a>
          <a href="#">Información</a>
          <a href="#">Blog</a>
          <a href="#">Empleo</a>
          <a href="#">AI</a>
        </nav>

        <p>© 2025 Qihao - Adrian - Rhian - Sebastian</p>
      </footer>
    </div>
  )
}
