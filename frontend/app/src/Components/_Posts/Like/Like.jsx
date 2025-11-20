import redlikeIcon from '../../../Assets/heartRed.png'
import whitelikeIcon from '../../../Assets/heartWhite.png'
import { API_URL } from '../../../constants'

const Like = ({ isLike, setIsLike, postId }) => {
  const handleLike = async () => {
    try {
      const res = await fetch(`${API_URL}/api/post/` + postId + '/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      })

      if (!res.ok) {
        console.log('Error al hacer like')
        alert('Inicia sesión bro!')
        return
      }
      const data = await res.json()
      console.log(data)
      setIsLike(!isLike)
    } catch (error) {
      console.log(error.message)
      alert('La has cagado bro!')
    }
  }

  return (
    <span
      onClick={handleLike}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s',
      }}
    >
      <img
        src={isLike ? redlikeIcon : whitelikeIcon}
        className="icon"
        alt="like"
      />
    </span>
  )
}

export default Like
