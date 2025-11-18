import { useState } from 'react'

export const EditProfileForm = ({ onClose, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePic: '',
    bio: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${API_URL}/api/users/${userProfile._id}/profile`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )
      const data = await res.json()

      if (res.ok) {
        alert('Perfil actualizado correctamente')
        onProfileUpdated(data.userProfile)
        onClose()
      } else {
        alert(data.error || 'Error al actualizar el perfil')
      }
    } catch (err) {
      console.error(err)
      alert('Error del servidor')
    }
    fetchUserProfile()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Editar perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Foto de perfil (URL):</label>
          <input
            type="text"
            name="profilePic"
            value={formData.profilePic}
            onChange={handleChange}
          />

          <label>Biografía:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />

          <div className="form-buttons">
            <button type="submit">Guardar cambios</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal {
          background: white;
          border-radius: 10px;
          padding: 20px;
          width: 400px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        .form-buttons {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
        }
        input,
        textarea {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
        }
      `}</style>
    </div>
  )
}
