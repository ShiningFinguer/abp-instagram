import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login({ setToken }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      alert('Usuario o contraseñas incorrectos')

      return
    }

    const { token } = await res.json()

    sessionStorage.setItem('token', token)
    setToken(token)

    navigate('/')
  }

  return (
    <div className="login-wrapper">
      <main className="login-container">
        <h1>Iniciar sesión</h1>
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

          <button type="submit">Entrar</button>
        </form>

        <p>
          ¿No tienes cuenta? <Link to="/signup">Ir a Signup</Link>
        </p>
      </main>
    </div>
  )
}
