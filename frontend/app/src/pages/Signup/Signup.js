import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    profilePic: null,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        email: formData.email,
      }),
    })

    if (!res.ok) {
      console.log('No se ha podido crear ususario')

      return
    }

    alert('Usuario creado sastifactoriamente')
  }

  return (
    <div className="signup-wrapper">
      <main className="signup-container">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Usuario"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <textarea
            placeholder="Biografía"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          ></textarea>

          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">Registrarme</button>
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/">Ir a Login</Link>
        </p>
      </main>
    </div>
  )
}
