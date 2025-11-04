import React from "react";
import userDefault from "../../../Assets/userDefault.png";

const Comment = ({ comment }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <div style={{ 
        width: "32px", 
        height: "32px", 
        borderRadius: "50%", 
        display: "flex",

      }}>
        <img src={userDefault} className="icon"/>
      </div>
      <div>
        <div>
          <strong>{comment.username}</strong>
          <span style={{ marginLeft: "8px" }}>{comment.text}</span>
        </div>
        <div style={{ fontSize: "12px", color: "grey", marginTop: "4px" }}>
          {comment.createdAt}
        </div>
      </div>
    </div>
  );
};

export default Comment;
