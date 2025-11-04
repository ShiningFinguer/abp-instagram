import React, { useState } from "react";
import Comment from "../Posts/Comments/Comment"; 
import Caption from "../Posts/Comments/Caption";
import Like from "../Posts/Like/Like";
import PostModal from "../Posts/Modal/PostModal";

import "../../CSS/Profile.css"
import commentIcon from "../../Assets/comment.png";


const ProfilePost = ({ post, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: "relative",
          cursor: "pointer",
          aspectRatio: "1/1",
          overflow: "hidden"
        }}
      >
        <img 
          src={post.imageURL} 
          alt="post"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

      </div>

      {isOpen && <PostModal isOpen={isOpen} post={post} userProfile={userProfile} onClose={() => setIsOpen(false)}/>}
    </>
  );
};

export default ProfilePost;
