import { useState, useEffect } from 'react'
import './SearchBoard.css'
import { API_URL } from '../../constants'

export const SearchBoard = ({ setUsers }) => {
  const [query, setQuery] = useState()

  useEffect(() => {
    if (!query) {
      setUsers([]) // limpiar resultados si no hay texto
      return
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/filter/` + query)

        if (!res.ok) {
          console.log('error')
          return
        }

        const users = await res.json()

        setUsers(users)
      } catch (error) {
        console.error('Error en la búsqueda:', error)
      }
    }

    fetchData()
  }, [query])

  return (
    <form className='searchBoard'>
      <input
        type='text'
        name='query'
        placeholder='Search User'
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
    </form>
  )
}
