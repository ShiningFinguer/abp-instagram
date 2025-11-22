import React, { useState } from 'react'
import { API_URL } from '../../constants'

export default function Settings () {
  const [formData, setFormData] = useState({ password: '' })
  const [message, setMessage] = useState('')
  const checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!checkPassword.test(formData.password)) {
      alert(
        'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.'
      )
      return
    }

    try {
      // Obtén el token del almacenamiento (asumiendo que lo guardas al hacer login)
      const token = localStorage.getItem('token')

      if (!token) {
        setMessage('No se ha encontrado el token. Inicia sesión primero.')
        return
      }

      const res = await fetch(`${API_URL}/api/users/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: formData.password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Error al cambiar contraseña')
      }

      setMessage('✅ Contraseña actualizada correctamente')
      setFormData({ password: '' })
    } catch (err) {
      setMessage(err.message)
    }
  }

  return (
    <>
      <meta charSet="UTF-8" />
      <title>Ajustes - MiRed</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          body { font-family: Arial, sans-serif; background: #f3f3f3; margin: 0; }
          header { background: #333; color: white; padding: 10px; }
          main { max-width: 500px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; }
          input { width: 100%; margin: 8px 0; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }
          button { background: #007bff; color: white; border: none; padding: 8px 10px; border-radius: 5px; cursor: pointer; margin-right: 10px; }
          button:nth-child(2) { background: #dc3545; }
        `
        }}
      />
      <header>
        <h1>Instagram - Settings</h1>
      </header>
      <main>
        <h2>Ajustes de cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Cambiar contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Guardar cambios</button>
          <button
            type="button"
            onClick={() => alert('Cerrar sesión aún no implementado')}
          >
            Cerrar sesión
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </>
  )
}
