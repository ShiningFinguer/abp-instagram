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
    fetch('https://localhost:3001/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(({ username }) => setUsername(username))
      .catch(e => console.log(e.message))
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
