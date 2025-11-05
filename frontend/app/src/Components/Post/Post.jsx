import { useState } from 'react'
import commentIcon from '../../Assets/comment.png'
import redlikeIcon from '../../Assets/heartRed.png'
import whitelikeIcon from '../../Assets/heartWhite.png'
import SendIcon from '../../Assets/send.png'
import './Post.css'

export default function Post({ post }) {
  const { description, images, createdAt } = post
  const createAtFormat = new Date(createdAt)
  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likes?.length)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState(post?.comments)
  const [showShareModal, setShowShareModal] = useState(false)

  const postLink = `https://instagram.com/p/${post.id}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postLink)
    setTimeout(() => {
      setShowShareModal(false)
    }, 2000)
  }

  const handleLike = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setIsLiked(!isLiked)
  }

  return (
    <article className="Post">
      <header className="Post-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={post?.createdBy?.profilePicURL || 'https://i.pravatar.cc/300'}
            alt="avatar"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <strong style={{ fontSize: '14px' }}>
              {post?.createdBy?.username || '@username'}
            </strong>
            <div style={{ fontSize: '12px', color: '#8e8e8e' }}>
              {createAtFormat.toDateString()}
            </div>
          </div>
        </div>
        <span style={{ cursor: 'pointer', fontSize: '20px' }}>⋯</span>
      </header>

      <div className="Post-body" style={{ cursor: 'pointer' }}>
        <img
          onClick={() => setIsOpen(true)}
          src={`/images/` + images[0]?.url + '.jpg'}
          alt="post"
          style={{ width: '100%', display: 'block' }}
        />
      </div>

      <footer className="Post-footer">
        <div
          style={{
            display: 'flex',
            gap: '15px',
            fontSize: '24px',
            marginBottom: '8px',
          }}
        >
          <span
            onClick={handleLike}
            style={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
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
            style={{ cursor: 'pointer' }}
          >
            <img src={commentIcon} className="icon" alt="comment" />
          </span>
          <span
            onClick={() => setShowShareModal(true)}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          >
            <img src={SendIcon} className="icon" />
          </span>
        </div>

        <div
          style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}
        >
          {isLiked ? 1 : 0} likes
        </div>

        <div style={{ marginBottom: '8px', fontSize: '14px' }}>
          <strong>{post?.createdBy?.username}</strong>
          <span style={{ marginLeft: '8px' }}>{post?.caption}</span>
        </div>

        {comments?.length > 0 && (
          <div
            style={{
              fontSize: '14px',
              color: '#8e8e8e',
              cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            View all {comments?.length} comments
          </div>
        )}
      </footer>
    </article>
  )
}
