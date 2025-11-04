import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Landing from './Components/Landing/Landing'
import Home from './Components/Home/Home'

function App() {
  const [token, setToken] = useState(sessionStorage.token)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (token) {
      async function getUser() {
        const res = await fetch('https://localhost:3001/api/users', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          alert('Error al ver el ususario')
          sessionStorage.removeItem('token')

          return
        }

        const { username: _username } = await res.json()

        setUsername(_username)
      }

      getUser()
    }
  }, [token])

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home username={username} /> : <Landing />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
    </Routes>
  )
}

export default App
