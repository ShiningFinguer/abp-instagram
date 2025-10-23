import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
