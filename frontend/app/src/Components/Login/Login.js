import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", username, password);
    alert(`Login: ${username} / ${password}`);
  };

  return (
    <div className="login-wrapper">
      <main className="login-container">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario o correo"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <p>
          ¿No tienes cuenta? <Link to="/signup">Ir a Signup</Link>
        </p>
      </main>
    </div>
  );
}
