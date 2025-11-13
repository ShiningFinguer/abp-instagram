import { useState, useEffect } from 'react'
import commentIcon from '../../Assets/comment.png'
import redlikeIcon from '../../Assets/heartRed.png'
import whitelikeIcon from '../../Assets/heartWhite.png'
import SendIcon from '../../Assets/send.png'
import avatar from '../../Assets/avatar.jpeg'
import './Post.css'
import Comment from '../Comment/Comment'
import Caption from '../Comment/Caption'
import Comments from '../Comments/Comments'

export default function Post({ post }) {
  const { description, image, createdAt } = post
  const createAtFormat = new Date(createdAt)
  const [isOpen, setIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const token = sessionStorage.getItem('token')
  const [showToolTip, setshowToolTip] = useState(false);

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

      setLikes(count)
    }

    countLikes()
      .then(() => console.log('bien'))
      .catch(e => console.log(e.message))
  }, [isLiked])

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

      setIsLiked(liked.liked)
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

  const handleLike = async () => {
    try {
      const res = await fetch(
        'http://localhost:3001/api/post/' + post._id + '/likes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) return console.log('Error al hacer like')
      const data = await res.json()
      console.log(data)
      setIsLiked(!isLiked)
    } catch (error) {
      console.log(error.message)
    }
  }

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
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if(!res.ok) {
      alert('No tienes permisos para eliminar este post')
      return
    } 

    alert('Eliminado correctamente');
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
              {post?.user?.username || '@username'}
            </strong>

            <div className="Post-date">{createAtFormat.toDateString()}</div>
          </div>
        </div>

        <span onClick={() => setshowToolTip(true)} style={{ cursor: 'pointer', fontSize: '20px' }}>⋯</span>
        {
          showToolTip ? <div>
            <button style={{backgroundColor:'red'}} onClick={handleDeletePost}>Eliminar post</button>
            <button onClick={() => {setshowToolTip(false)}}>Esconder</button>
          </div> : null
        }



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

        <div className="Post-footer-row-2"> {likes.likes} likes</div>

        <Caption description={description} />

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
