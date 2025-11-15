import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Landing from './pages/Landing/Landing'
import Feed from './pages/Feed/Feed'
import Profile from './pages/Profile/Profile'
import Settings from './Components/Settings/Settings'

function App() {
  const [token, setToken] = useState(sessionStorage.token)
  const navigate = useNavigate()

  const logOut = () => {
    setToken('')
    sessionStorage.removeItem('token')
    navigate('/')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          token ? <Feed logOut={logOut} /> : <Landing setToken={setToken} />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile logOut={logOut} />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/:username" element={<Profile logOut={logOut} />} />
    </Routes>
  )
}

export default App
