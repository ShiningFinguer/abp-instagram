import React from "react";
import userDefault from "../../Assets/userDefault.png";

// Función simple para mostrar "hace X tiempo" (puedes mejorarla después)
const simpleTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
};

const Comment = ({ comment }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <div style={{ 
        width: "32px", 
        height: "32px", 
        borderRadius: "50%", 
        backgroundColor: "#dbdbdb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <img src={userDefault} className="icon"/>
      </div>
      <div>
        <div>
          <strong style={{ fontSize: "14px" }}>{comment.username}</strong>
          <span style={{ fontSize: "14px", marginLeft: "8px" }}>{comment.text}</span>
        </div>
        <div style={{ fontSize: "12px", color: "#8e8e8e", marginTop: "4px" }}>
          {comment.createdAt}
        </div>
      </div>
    </div>
  );
};

export default Comment;
