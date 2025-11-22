import { useState } from 'react'
import { Link } from 'react-router-dom'
import imageCompression from 'browser-image-compression'

import { Alert } from '../../Components/Alert/Alert'

import { API_URL } from '../../constants'

import './Signup.css'

export default function Signup () {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    avatar: null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = e => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const options = {
      maxSizeMB: 2, // tamaño máximo final (2 MB es perfecto para avatares)
      maxWidthOrHeight: 800, // redimensiona (opcional)
      useWebWorker: true
    }

    try {
      const dataToSend = new FormData()
      dataToSend.append('username', formData.username)
      dataToSend.append('password', formData.password)
      dataToSend.append('email', formData.email)
      dataToSend.append('bio', formData.bio)
      if (formData.avatar) {
        const compressedFile = await imageCompression(formData?.avatar, options)
        dataToSend.append('avatar', compressedFile)
      }

      setSuccess('')
      setError('')
      setLoading(true)

      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        body: dataToSend
      })

      if (!res.ok) {
        setError('Usuario ya registrado, vuelve a intentarlo')
        return
      }

      setSuccess('Usuario registrado sastifactoriamente')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-wrapper">
      <main className="signup-container">
        <h1>Crear cuenta</h1>
        <form
          className="signup-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
            name="avatar"
            accept="image/*"
            onChange={handleChange}
          />

          <button type="submit">
            {loading ? 'Registrando...' : 'Registrar'}
          </button>

          {error && <Alert>{error}</Alert>}

          {success && (
            <Alert variant="success">
              {success} <br /> Inicia sesión ⬇️
            </Alert>
          )}
        </form>

        <p>
          ¿Ya tienes cuenta? <Link to="/">Ir a Login</Link>
        </p>
      </main>
    </div>
  )
}
