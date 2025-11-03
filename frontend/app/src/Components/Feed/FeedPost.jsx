import React, { useState } from "react";
import FeedPostHeader from "./FeedPostHeader";
import FeedPostFooter from "./FeedPostFooter";
import ProfilePost from "../Profile/ProfilePost";
import FeedPostFooter from "./FeedPostFooter";
import FeedPostHeader from "./FeedPostHeader";

const FeedPost = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments.length + 1,
        username: "you",
        text: commentText,
        createdAt: "Just now"
      };
      setComments([...comments, newComment]);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  return (
    <>
      <div style={{
        maxWidth: "470px",
        width: "100%",
        margin: "0 auto 20px",
        backgroundColor: "white",
        border: "1px solid #dbdbdb",
        borderRadius: "8px"
      }}>
        <FeedPostHeader post={post} />
        
        <div style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
          <img 
            src={post.imageURL}
            alt="post"
            style={{ width: "100%", display: "block" }}
          />
        </div>

        <FeedPostFooter 
          post={post}
          isLiked={isLiked}
          likesCount={likesCount}
          handleLike={handleLike}
          showCommentInput={showCommentInput}
          setShowCommentInput={setShowCommentInput}
          commentText={commentText}
          setCommentText={setCommentText}
          handleAddComment={handleAddComment}
          comments={comments}
        />
      </div>

      {showModal && (
        <div onClick={() => setShowModal(false)}>
          <ProfilePost 
            post={{...post, comments: comments, likes: Array(likesCount).fill("user")}} 
            userProfile={post.createdBy}
          />
        </div>
      )}
    </>
  );
};

export default FeedPost;