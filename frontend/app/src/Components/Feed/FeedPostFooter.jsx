import React, { useState } from "react";
import commentIcon from "../../Assets/comment.png";
import redlikeIcon from "../../Assets/heartRed.png";
import whitelikeIcon from "../../Assets/heartWhite.png";

const FeedPostFooter = ({ post, isLiked, likesCount, handleLike, showCommentInput, setShowCommentInput, commentText, setCommentText, handleAddComment, comments }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const postLink = `https://instagram.com/p/${post.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
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
            📤
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

        {showCommentInput && (
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "10px" }}>
            <input
              type="text"
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
                padding: "8px",
                border: "1px solid #dbdbdb",
                borderRadius: "4px",
                outline: "none",
                fontSize: "14px"
              }}
            />
            <button
              onClick={handleAddComment}
              style={{
                padding: "8px 16px",
                backgroundColor: commentText.trim() ? "#0095f6" : "#b2dffc",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: commentText.trim() ? "pointer" : "not-allowed",
                fontWeight: "bold",
                fontSize: "14px"
              }}
              disabled={!commentText.trim()}
            >
              Post
            </button>
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
                backgroundColor: copied ? "#00c853" : "#0095f6",
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
              {copied ? "✓ Copied!" : "Copy Link"}
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