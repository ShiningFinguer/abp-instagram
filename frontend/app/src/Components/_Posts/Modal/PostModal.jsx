import React, { useState } from "react";
import Comment from "../Comments/Comment";
import Caption from "../Comments/Caption";
import Like from "../Like/Like";

import commentIcon from "../../../Assets/comment.png";



const PostModal = ({ isOpen, post, userProfile, onClose}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);

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
        username: userProfile.username,
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
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              display: "flex",
              maxWidth: "90%",
              maxHeight: "90%",
              position: "relative"
            }}
          >

            <div style={{ flex: "1.5", display: "flex", alignItems: "center", backgroundColor: "black" }}>
              <img
                src={post.imageURL}
                alt="post"
                style={{ width: "100%", height: "auto", maxHeight: "90vh", objectFit: "contain" }}
              />
            </div>

            <div style={{
              flex: "1",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              minWidth: "300px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <img
                  src={userProfile.profilePicURL}
                  alt="avatar"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                />
                <strong>{userProfile.username}</strong>
              </div>

              <div style={{
                borderTop: "1px solid #dbdbdb",
                paddingTop: "20px",
                flex: 1,
                overflowY: "auto",
                maxHeight: "400px"
              }}>
                {post.caption && <Caption post={post} userProfile={userProfile} />}
                {comments.map((comment) => (
                  <Comment key={comment.id} comment={comment} />
                ))}
              </div>

              <div style={{ borderTop: "1px solid #dbdbdb", paddingTop: "10px", marginTop: "10px" }}>
                <div style={{ display: "flex", gap: "15px", fontSize: "24px", marginBottom: "10px" }}>
                  <Like isLiked={isLiked} handleLike={handleLike}/>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCommentInput(!showCommentInput);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <img src={commentIcon} className="icon"/>
                  </span>
                </div>
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  {likesCount} likes
                </div>
                <div style={{ fontSize: "12px", color: "#8e8e8e", marginBottom: "10px" }}>
                  {post.createdAt}
                </div>

                {showCommentInput && (
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
                    <input
                      type="textArea"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment();
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "1px solid #dbdbdb",
                        borderRadius: "4px",
                        outline: "none",
                        height: "100px",
                        fontSize: "14px"
                      }}
                    />
                    <button
                      onClick={handleAddComment}
                      style={{
                        padding: "6px 12px",
                        backgroundColor: commentText.trim() ? "#0095f6" : "#b2dffc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: commentText.trim() ? "pointer" : "not-allowed",
                        fontWeight: "bold",
                        fontSize: "12px"
                      }}
                      disabled={!commentText.trim()}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostModal;
