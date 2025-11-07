import { useState, useEffect } from 'react'
import commentIcon from '../../Assets/comment.png'
import redlikeIcon from '../../Assets/heartRed.png'
import whitelikeIcon from '../../Assets/heartWhite.png'
import SendIcon from '../../Assets/send.png'
import avatar from '../../Assets/avatar.jpeg'
import './Post.css'

export default function Post({ post }) {
  const { description, images, createdAt } = post
  const createAtFormat = new Date(createdAt)
  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [countLiked, setCountLiked] = useState([])


  useEffect(() => {
    async function countLikes() {
      const res = await fetch(`http://localhost:3001/api/post/${post._id}/likes`, {
        method: 'get'
      });

      if (!res.ok) {
        console.log('error')

        return
      }

      const count = await res.json()

      setCountLiked(count)
    }

    countLikes()
      .then(() => console.log('bien'))
      .catch(e => console.log(e.message))
  }, []);
  // useEffect(() => {
  //   async function countLikes() {
  //     const res = await fetch(`http://localhost:3001/api/post/${post._id}/likes`, {
  //       method: 'get'
  //     });

  //     if (!res.ok) {
  //       console.log('error')

  //       return
  //     }

  //     const count = await res.json()

  //     setCountLiked(count)
  //   }

  //   countLikes()
  //     .then(() => console.log('bien'))
  //     .catch(e => console.log(e.message))
  // }, []);


  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <article className="Post">
      {/* Header */}
      <header className="Post-header">
        <div className="Post-header-wrapper">
          <img
            className="Post-avatar"
            src={post?.createdBy?.profilePicURL || avatar}
            alt="avatar"
          />
          <div>
            <strong className="Post-username">
              {post?.createdBy?.username || '@username'}
            </strong>

            <div className="Post-date">{createAtFormat.toDateString()}</div>
          </div>
        </div>

        <span style={{ cursor: 'pointer', fontSize: '20px' }}>⋯</span>
      </header>

      {/* Body */}
      <div className="Post-body">
        <img
          className="Post-picture"
          onClick={() => setIsOpen(true)}
          src={`/images/` + images[0]?.url + '.jpg'}
          alt="post"
        />
      </div>

      {/* Footer */}
      <footer className="Post-footer">
        <div className="Post-footer-row-1">
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
          {/* <span
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
          </span> */}
        </div>

        <div className="Post-footer-row-2"> {countLiked.likes} likes</div>

        <div
          className="Post-footer-row-3"
          style={{ marginBottom: '8px', fontSize: '14px' }}
        >
          <strong>username</strong>
          <span style={{ marginLeft: '8px' }}>{description}</span>
        </div>

        <div
          style={{
            fontSize: '14px',
            color: '#8e8e8e',
            cursor: 'pointer',
            marginBottom: '8px',
          }}
        >
          View all comments
        </div>
      </footer>
    </article>
  )
}
