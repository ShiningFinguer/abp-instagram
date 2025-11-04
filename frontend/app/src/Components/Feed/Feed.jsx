import Navbar from "../NavBar/Navbar";
import FeedPosts from "./FeedPosts";
import grayimage from "../../Assets/defaultPicture.PNG";
import defaultPicture from "../../Assets/userDefault.png";
import React, { useState, useEffect } from "react";

const dummyPosts = [
  {
    id: 1,
    imageURL: grayimage,
    caption: "Beautiful mountain view!",
    likes: ["user1", "user2", "user3"],
    comments: [
      { id: 1, username: "alice", text: "Amazing photo!", createdAt: "2h ago" },
      { id: 2, username: "bob", text: "Love it!", createdAt: "1h ago" }
    ],
    createdAt: "1 day ago",
    createdBy: {
      username: "naturelover",
      profilePicURL: defaultPicture
    }
  },
  {
    id: 2,
    imageURL: grayimage,
    caption: "Nature is beautiful",
    likes: ["user1", "user2"],
    comments: [
      { id: 3, username: "charlie", text: "Stunning!", createdAt: "3h ago" }
    ],
    createdAt: "2 days ago",
    createdBy: {
      username: "explorer",
      profilePicURL: grayimage
    }
  },
  {
    id: 3,
    imageURL: grayimage,
    caption: "Sunset vibes",
    likes: ["user1"],
    comments: [],
    createdAt: "3 days ago",
    createdBy: {
      username: "sunsetlover",
      profilePicURL: grayimage
    }
  }
];

const Feed = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nothing, setNothing] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        // Petición Asyncrona para obtener información de servidores externos
        const response = await fetch("https://localhost:3001/api/post/");
        if (!response.ok) {
          setNothing(true);
        } else {
          setNothing(false);
        }
        const data = await response.json();
        setPost(data);
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
  if (nothing) return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: "0",
      padding: "0",
    }}>
      <Navbar />
      <p>No hay post</p>
    </div>
  );

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      margin: "0",
      padding: "0",
    }}>
      <Navbar />
      <FeedPosts posts={post} />
    </div>
  );
};

export default Feed;