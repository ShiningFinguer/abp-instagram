import './SearchBoard.css'

export const SearchBoard = ({ onCambio }) => {
  const manejarInputs = async e => {
    const nuevoValor = e.target.value
    if (!nuevoValor.trim()) {
      onCambio([])
      return
    }
    const res = await fetch(
      'http://localhost:3001/api/users/filter/' + nuevoValor,
      {
        method: 'get',
      }
    )

    if (!res.ok) {
      console.log('error')
      return
    }

    const usuarios = await res.json()
    onCambio(usuarios)
  }

  return (
    <input
      className="searchBoard"
      type="text"
      name="text"
      placeholder="Search User"
      onChange={manejarInputs}
    />
  )
}
