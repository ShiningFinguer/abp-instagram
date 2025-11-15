import redlikeIcon from '../../../Assets/heartRed.png'
import whitelikeIcon from '../../../Assets/heartWhite.png'

const Like = ({ isLike, setIsLike, postId }) => {
  const handleLike = async () => {
    try {
      const res = await fetch(
        'http://localhost:3001/api/post/' + postId + '/likes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.token}`,
          },
        }
      )

      if (!res.ok) return console.log('Error al hacer like')
      const data = await res.json()
      console.log(data)
      setIsLike(!isLike)
    } catch (error) {
      console.log(error.message)
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
