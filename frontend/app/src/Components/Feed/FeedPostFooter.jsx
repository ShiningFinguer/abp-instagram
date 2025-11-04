import React, { useState } from "react";
import commentIcon from "../../Assets/comment.png";
import redlikeIcon from "../../Assets/heartRed.png";
import whitelikeIcon from "../../Assets/heartWhite.png";
import SendIcon from "../../Assets/send.png";

const FeedPostFooter = ({ post, isLiked, likesCount, handleLike, showCommentInput, setShowCommentInput, commentText, setCommentText, comments }) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const postLink = `https://instagram.com/p/${post.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postLink);
    setTimeout(() => {
      setShowShareModal(false);
    }, 2000);
  };

  return (
    <>
      <div style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", gap: "15px", fontSize: "24px", marginBottom: "8px" }}>
          <span 
            onClick={handleLike}
            style={{ 
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            <img 
              src={isLiked ? redlikeIcon : whitelikeIcon} 
              className="icon"
              alt="like"
            />
          </span>
          <span 
            onClick={() => setShowCommentInput(!showCommentInput)}
            style={{ cursor: "pointer" }}
          >
            <img src={commentIcon} className="icon" alt="comment"/>
          </span>
          <span 
            onClick={() => setShowShareModal(true)}
            style={{ cursor: "pointer", fontSize: "20px" }}
          >
            <img src={SendIcon} className="icon"/>
          </span>
        </div>

        <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px" }}>
          {likesCount} likes
        </div>

        <div style={{ marginBottom: "8px", fontSize: "14px" }}>
          <strong>{post.createdBy.username}</strong>
          <span style={{ marginLeft: "8px" }}>{post.caption}</span>
        </div>

        {comments.length > 0 && (
          <div style={{ 
            fontSize: "14px", 
            color: "#8e8e8e", 
            cursor: "pointer",
            marginBottom: "8px"
          }}>
            View all {comments.length} comments
          </div>
        )}

      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div
          onClick={() => setShowShareModal(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "30px",
              minWidth: "400px",
              textAlign: "center"
            }}
          >
            <h3 style={{ marginBottom: "20px", fontSize: "18px" }}>Share Post</h3>
            
            <div style={{
              backgroundColor: "#f0f0f0",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "20px",
              wordBreak: "break-all",
              fontSize: "14px"
            }}>
              {postLink}
            </div>

            <button
              onClick={handleCopyLink}
              style={{
                padding: "10px 30px",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "10px",
                width: "100%"
              }}
            >
              Copy Link
            </button>

            <button
              onClick={() => setShowShareModal(false)}
              style={{
                padding: "10px 30px",
                backgroundColor: "transparent",
                color: "#262626",
                border: "1px solid #dbdbdb",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
                width: "100%"
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedPostFooter;