import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Signup.css";

export default function Settings() {
    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log("Datos del registro:", formData);
        alert("Formulario enviado (sin backend)");
      };
 

  return (
    <>
    <meta charSet="UTF-8" />
    <title>Ajustes - MiRed</title>
    <style
        dangerouslySetInnerHTML={{
        __html:
            "\n    body { font-family: Arial, sans-serif; background: #f3f3f3; margin: 0; }\n    header { background: #333; color: white; padding: 10px; }\n    main { max-width: 500px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; }\n    input, textarea { width: 100%; margin: 8px 0; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }\n    button { background: #007bff; color: white; border: none; padding: 8px 10px; border-radius: 5px; cursor: pointer; margin-right: 10px; }\n    button:nth-child(2) { background: #dc3545; }\n  "
        }}
    />
    <header>
        <h1>Niggerland</h1>
    </header>
    <main>
        <h2>Ajustes de cuenta</h2>
        <form onSubmit={handleSubmit}>
        <label>Cambiar contraseña</label>
        <input type="password" placeholder="Nueva contraseña"/>
        <button>Guardar cambios</button>
        <button type="button">Cerrar sesión</button>
        </form>
    </main>
    </>

  );
}
