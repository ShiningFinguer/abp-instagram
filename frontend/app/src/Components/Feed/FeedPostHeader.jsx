import React from "react";

const FeedPostHeader = ({ post }) => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 16px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img 
          src={post.createdBy.profilePicURL}
          alt="avatar"
          style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
        />
        <div>
          <strong style={{ fontSize: "14px" }}>{post.createdBy.username}</strong>
          <div style={{ fontSize: "12px", color: "#8e8e8e" }}>{post.createdAt}</div>
        </div>
      </div>
      <span style={{ cursor: "pointer", fontSize: "20px" }}>⋯</span>
    </div>
  );
};

export default FeedPostHeader;