import { useState, useEffect } from 'react'
import commentIcon from '../../Assets/comment.png'
import redlikeIcon from '../../Assets/heartRed.png'
import whitelikeIcon from '../../Assets/heartWhite.png'
import SendIcon from '../../Assets/send.png'
import avatar from '../../Assets/avatar.jpeg'
import Caption from '../Comment/Caption'
import Comments from '../Comments/Comments'
import './Post.css'
import { simpleTimeAgo } from '../../utils'
import Like from '../_Posts/Like/Like'

export default function Post({ post }) {
  const { description, image, createdAt } = post
  const formatedCreatedAt = simpleTimeAgo(post.createdAt)
  const [isOpen, setIsOpen] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [countLikes, setCountLikes] = useState([])
  const [comments, setComments] = useState([])
  const token = sessionStorage.getItem('token')
  const [showToolTip, setshowToolTip] = useState(false)

  useEffect(() => {
    async function countLikes() {
      const res = await fetch(
        'http://localhost:3001/api/post/' + post._id + '/likes',
        {
          method: 'get',
        }
      )

      if (!res.ok) {
        console.log('error')
        return
      }

      const count = await res.json()

      setCountLikes(count)
    }

    countLikes()
      .then(() => console.log('bien'))
      .catch(e => console.log(e.message))
  }, [isLike])

  useEffect(() => {
    async function Liked() {
      const res = await fetch(
        'http://localhost:3001/api/post/' + post._id + '/isliked',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        console.log('error')
        return
      }

      const liked = await res.json()

      setIsLike(liked.liked)
    }
    Liked()
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${post._id}/comments`)
      .then(res => {
        if (!res.ok) return console.log('Algo salio mal!')

        return res.json()
      })
      .then(setComments)
      .catch(e => console.log(e.message))
  }, [])

  const handleCommentSubmit = async e => {
    e.preventDefault()

    const text = e.target.text.value

    const res = await fetch(
      `http://localhost:3001/api/posts/${post._id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      }
    )

    if (!res.ok) return console.log('No se ha podido crear el comentario')

    const { comment } = await res.json()

    setComments(prevComments => [...prevComments, comment])

    e.target.reset()
  }

  const handleDeletePost = async () => {
    const res = await fetch(`http://localhost:3001/api/post/${post._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      alert('No tienes permisos para eliminar este post')
      return
    }

    alert('Eliminado correctamente')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText('http://localhost:3000/')
    alert('¡Link copiado al portapapeles!')
  }

  return (
    <article className="Post">
      {/* Header */}
      <header className="Post-header">
        <div className="Post-header-wrapper">
          <img
            className="Post-avatar"
            src={post?.user?.avatar || avatar}
            alt="avatar"
          />
          <div>
            <strong className="Post-username">
              {`@${post?.user?.username || 'username'}`}
            </strong>

            <div className="Post-date">{formatedCreatedAt}</div>
          </div>
        </div>

        <span
          onClick={() => setshowToolTip(true)}
          style={{ cursor: 'pointer', fontSize: '20px' }}
        >
          ⋯
        </span>
        {showToolTip ? (
          <div>
            <button onClick={handleCopyLink}>Copy Link</button>
            <button
              style={{ backgroundColor: 'red' }}
              onClick={handleDeletePost}
            >
              Eliminar post
            </button>
            <button
              onClick={() => {
                setshowToolTip(false)
              }}
            >
              Esconder
            </button>
          </div>
        ) : null}
      </header>

      {/* Body */}
      <div className="Post-body">
        <img
          className="Post-picture"
          onClick={() => setIsOpen(true)}
          src={`http://localhost:3001/uploads/` + image}
          alt="post"
        />
      </div>

      {/* Footer */}
      <footer className="Post-footer">
        <div className="Post-footer-row-1">
          <Like isLike={isLike} setIsLike={setIsLike} postId={post._id} />
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

        <div className="Post-footer-row-2"> {countLikes.likes} Me gusta</div>

        <Caption
          avatar={post?.user?.avatar}
          username={post?.user?.username}
          description={description}
          createdAt={post.createdAt}
        />

        <Comments comments={comments} />

        <form onSubmit={handleCommentSubmit}>
          <input type="text" name="text" placeholder="Comentario..." />
        </form>

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
