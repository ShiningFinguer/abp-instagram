import { useState, useEffect } from 'react'
import userDefault from '../../Assets/userDefault.png'
import SendIcon from '../../Assets/send.png'
import Caption from '../Comment/Caption'
import Comments from '../Comments/Comments'
import './Post.css'
import { simpleTimeAgo } from '../../utils'
import Like from '../_Posts/Like/Like'
import { API_URL } from '../../constants'
import { Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Post ({ post, onDelete }) {
  const { description, image } = post
  const formatedCreatedAt = simpleTimeAgo(post.createdAt)
  const [, setIsOpen] = useState(false)
  const [isLike, setIsLike] = useState(false)
  const [countLikes, setCountLikes] = useState([])
  const [comments, setComments] = useState([])
  const token = window.localStorage.getItem('token')
  const [showToolTip, setshowToolTip] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function countLikes () {
      const res = await fetch(`${API_URL}/api/post/` + post._id + '/likes', {
        method: 'get'
      })

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
    async function Liked () {
      const res = await fetch(`${API_URL}/api/post/` + post._id + '/isliked', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

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
    fetch(`${API_URL}/api/posts/${post._id}/comments`)
      .then(res => {
        if (!res.ok) return console.log('Algo salio mal!')

        return res.json()
      })
      .then(setComments)
      .catch(e => console.log(e.message))
  }, [])

  const handleCommentSubmit = async e => {
    e.preventDefault()

    if (!token) {
      window.alert('Inicia sesión bro!')
      return navigate('/login')
    }

    const text = e.target.text.value

    const res = await fetch(`${API_URL}/api/posts/${post._id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ text })
    })

    if (!res.ok) return console.log('No se ha podido crear el comentario')

    const { comment } = await res.json()

    setComments(prevComments => [...prevComments, comment])

    e.target.reset()
  }

  const handleDeletePost = async () => {
    if (!token) {
      return navigate('/login')
    }

    if (!window.confirm('¿Estás seguro de eliminar este post?')) return

    const res = await fetch(`${API_URL}/api/post/${post._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      window.alert('No tienes permisos para eliminar este post')
      return
    }

    // Llamar la función del padre para eliminar el post de la lista
    if (onDelete) onDelete(post._id)
  }

  return (
    <article className='Post'>
      {/* Header */}
      <header className='Post-header'>
        <div className='Post-header-wrapper'>
          <Link to={`/${post?.user?.username}`}>
            <img
              className='Post-avatar'
              src={
                post?.user?.profilePic
                  ? `${API_URL}/avatars/${post?.user?.profilePic}`
                  : userDefault
              }
              alt='avatar'
            />
          </Link>
          <div>
            <div className='Post-username'>
              <Link to={`/${post?.user?.username}`}>
                <strong>{`@${post?.user?.username || 'username'}`}</strong>
              </Link>
            </div>

            <div className='Post-date'>{formatedCreatedAt}</div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          {showToolTip && (
            <div style={{ cursor: 'pointer' }} onClick={handleDeletePost}>
              <Trash2 color='#f83e3e' />
            </div>
          )}

          <span
            onClick={() => setshowToolTip(!showToolTip)}
            style={{ cursor: 'pointer', fontSize: '20px' }}
          >
            ⋯
          </span>
        </div>
      </header>

      {/* Body */}
      <div className='Post-body'>
        <img
          className='Post-picture'
          onClick={() => setIsOpen(true)}
          src={image}
          alt='post'
        />
      </div>

      {/* Footer */}
      <footer className='Post-footer'>
        <div className='Post-footer-row-1'>
          <Like isLike={isLike} setIsLike={setIsLike} postId={post._id} />
          <img src={SendIcon} className='icon' />
        </div>

        <div className='Post-footer-row-2'> {countLikes.likes} Me gusta</div>

        <Caption
          avatar={post?.user?.profilePic}
          username={post?.user?.username}
          description={description}
          createdAt={post.createdAt}
        />

        <Comments comments={comments} />

        <form onSubmit={handleCommentSubmit}>
          <input type='text' name='text' placeholder='Comentario...' />
        </form>
      </footer>
    </article>
  )
}
