import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Profile from './Components/Profile/Profile'
import Feed from './Components/Feed/Feed'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/home" element={<Feed/>} />
    </Routes>
  )
}

export default App
