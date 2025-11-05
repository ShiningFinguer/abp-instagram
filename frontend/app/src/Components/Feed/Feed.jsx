import Navbar from "../NavBar/Navbar";
import FeedPost from "./FeedPost";
import React, { useState, useEffect } from "react";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Petición Asyncrona para obtener información de servidores externos
        const response = await fetch("https://localhost:3001/api/post/");
        if (!response.ok) {
        }
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    //Se llama a la función
    fetchUsuarios();
  }, []);

  if (loading) return (
    <p>Cargando usuarios...</p>
  );

  if (error) return (
    <p>Error: {error}</p>
  );


  console.log(posts)

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: "0",
      padding: "0",
    }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          paddingBottom: "40px",
          minHeight: "calc(100vh - 60px)",
          backgroundColor: "#fafafa",
          margin: "20px"
        }}>
        {posts.map((post) => (
          <FeedPost
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;