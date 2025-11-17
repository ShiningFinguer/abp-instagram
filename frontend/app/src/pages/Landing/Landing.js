import { useState } from 'react'
import './Landing.css'
import Logo from '../../Components/Logo/Logo'
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '../../Components/Alert/Alert'
import { API_URL } from '../../constants'

export default function Landing({ setToken }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setError('Usuario o contraseñas incorrectos')

        return
      }

      const { token } = await res.json()

      sessionStorage.setItem('token', token)

      setToken(token)

      navigate('/')
    } catch (error) {
      setError(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="Landing">
      <main className="Landing-main">
        <img className="Landing-img" src="/landing.png" />

        <div style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Logo />
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Usuario o correo"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <button type="submit">{loading ? 'Cargando..' : 'Entrar'}</button>

            {error && <Alert variant="error">{error}</Alert>}
          </form>

          <p>
            ¿No tienes una cuenta? <Link to="/signup">Regístrate</Link>
          </p>
        </div>
      </main>

      <footer className="Landing-footer">
        <p>© 2025 Qihao - Adrian - Rhian - Sebastian</p>
      </footer>
    </div>
  )
}
