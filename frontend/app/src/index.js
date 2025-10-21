import React from 'react';
import ReactDOM from 'react-dom';


const App = () => {
  return (
    <div>
      funciona
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));


/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
*/