import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login/Login'
import Signup from "./Components/Signup/Signup";
import InstagramProfile from "./Profile/Profile";

function App() {
  return (
    /*
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    */
   <div>Funciona correctamente

        <InstagramProfile/>
   </div>
  );
}

export default App;