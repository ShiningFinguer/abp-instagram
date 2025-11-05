import React, { useState } from "react";
import FeedPostHeader from "./FeedPostHeader";
import FeedPostFooter from "./FeedPostFooter";
import icon from "../../Assets/defaultPicture.PNG";

const FeedPost = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  // const [showCommentInput, setShowCommentInput] = useState(false);
  // const [commentText, setCommentText] = useState("");
  // const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div style={{
        maxWidth: "470px",
        width: "100%",
        margin: "0 auto 20px",
        backgroundColor: "white",
      }}>
        <FeedPostHeader post={post} />
        
        <div style={{ cursor: "pointer" }}>
          <img 
            onClick={() => setIsOpen(true)}
            src={icon}
            alt="post"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <FeedPostFooter 
          post={post}
          images={post.images}
          isLiked={isLiked}
          likesCount={likesCount}
          handleLike={handleLike}
          // showCommentInput={showCommentInput}
          // setShowCommentInput={setShowCommentInput}
          // commentText={commentText}
          // setCommentText={setCommentText}
          // comments={comments}
        />
      </div>
      {/* {isOpen && <PostModal isOpen={isOpen} post={post} userProfile={userProfile} onClose={() => setIsOpen(false)}/>} */}
    </>
  );
};

export default FeedPost;