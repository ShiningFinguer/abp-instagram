import { useState } from 'react'
import './NewPostModal.css'
import { API_URL } from '../../constants'

export const NewPostModal = ({ isOpen, setIsOpen, setPosts }) => {
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    if (!image) {
      setError('Selecciona una imagen antes de subir.')
      return
    }

    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('description', description)
    formData.append('image', image)

    try {
      const res = await fetch(`${API_URL}/api/users/post`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: formData,
      })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || 'Error al crear el post')
      }

      console.log('✅ Post creado satisfactoriamente')

      // Actualiza la lista de posts
      const res2 = await fetch(`${API_URL}/api/post`)
      if (!res2.ok) throw new Error('Error al obtener los posts')

      const posts = await res2.json()
      setPosts(posts)

      // Limpia el formulario
      setDescription('')
      setImage(null)
      setPreview(null)
      setIsOpen(false)
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se ha podido subir el post')
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  if (!isOpen) return null

  return (
    <div className="NewPostModal">
      <button onClick={() => setIsOpen(false)} className="NewPostModal-close">
        ✕
      </button>

      <div className="NewPostModal-panel">
        <h3 className="NewPostModal-title">Nuevo Post</h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <textarea
            className="NewPostModal-text-area"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Escribe una descripción..."
            maxLength={200}
            required
            name="description"
          />

          <input type="file" accept="image/*" onChange={handleFileChange} />

          {preview && (
            <div className="NewPostModal-preview">
              <img
                style={{ maxWidth: '100%' }}
                src={preview}
                alt="Vista previa"
              />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Subiendo...' : 'Subir post'}
          </button>

          {error && <p className="NewPostModal-error">{error}</p>}
        </form>
      </div>
    </div>
  )
}
