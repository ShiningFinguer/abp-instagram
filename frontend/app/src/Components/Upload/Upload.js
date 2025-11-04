import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../CSS/Signup.css";

//pagina web usada para pasar los html a jsx ==> https://transform.tools/html-to-jsx
export default function Settings() {
    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log("Datos del registro:", formData);
        alert("Formulario enviado (sin backend)");
        //this function should take d
      };
 

  return (
    <>
    <meta charSet="UTF-8" />
    <title>Subir publicación - MiRed</title>
    <style
        dangerouslySetInnerHTML={{
        __html:
            "\n    body { font-family: Arial, sans-serif; background: #f3f3f3; margin: 0; }\n    header { background: #333; color: white; padding: 10px; }\n    main { max-width: 500px; margin: 20px auto; background: white; padding: 20px; border-radius: 8px; }\n    input, textarea { width: 100%; margin: 10px 0; padding: 8px; border: 1px solid #ccc; border-radius: 5px; }\n    button { background: #007bff; color: white; padding: 8px 12px; border: none; border-radius: 5px; cursor: pointer; }\n    button:hover { background: #0056b3; }\n  "
        }}
    />
    <header>
        <h1>MiRed</h1>
    </header>
    <main>
        <h2>Nueva publicación</h2>
        <form onSubmit={handleSubmit}>
        <label>Selecciona imagen o vídeo:</label>
        <input type="file" accept="image/*,video/*" required="" />
        <label>Descripción:</label>
        <textarea rows={3} placeholder="Escribe algo..." defaultValue={""} />
        <button type="submit">Publicar</button>
        </form>
    </main>
    </>


  );
}