import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Landing from './pages/Landing/Landing'
import Feed from './pages/Feed/Feed'
import Profile from './pages/Profile/Profile'
import Settings from './Components/Settings/Settings'

function App() {
  const [token, setToken] = useState(sessionStorage.token)
  const [username, setUsername] = useState('')

  useEffect(() => {
    if (token) {
      async function getUser() {
        try {
          const res = await fetch('http://localhost:3001/api/users', {
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
        } catch (error) {
          console.log(error.message)
        }
      }

      getUser()
        .then(() => console.log('bien'))
        .catch(e => console.log(e.message))
    }
  }, [token])

  return (
    <Routes>
      <Route path="/" element={token ? <Feed /> : <Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings/>} />
      <Route path="/:username" element={<Profile />} />
    </Routes>
  )
}

export default App
