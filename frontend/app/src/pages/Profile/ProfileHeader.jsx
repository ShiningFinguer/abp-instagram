import { useEffect, useState } from 'react'

const ProfileHeader = ({ user, itsMe }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const token = sessionStorage.token

  useEffect(() => {
    if (user) {

      // Fetch is Followed
      fetch(`http://localhost:3001/api/users/${user.username}/follow`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(({ followed }) => setIsFollowing(followed))
        .catch(e => console.log(e))
    }
  }, [user])

  const handleFollowClick = async e => {
    if (!token) return console.log('Debes iniciar sesion')

    if (!user) return console.log('No has iniciado sesión')

    try {
      const res = await fetch(
        `http://localhost:3001/api/users/${user.username}/follow`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const error = await res.json()

        console.log(error)

        return
      }

      const success = await res.json()

      console.log(success)

      setIsFollowing(!isFollowing)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {/* Profile Picture */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={user?.avatar || 'https://i.pravatar.cc/300'}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      </div>

      {/* Username and Follow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h2>{user?.username}</h2>
        <button onClick={handleFollowClick}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      {/* Profile Info */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div>
          <strong>{user?.posts.length}</strong> Posts
        </div>
        <div>
          <strong>{user?.following.length}</strong> Followers
        </div>
        <div>
          <strong>{user?.followers.length}</strong> Following
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {user?.username}
      </div>

      {/* Bio */}
      <div style={{ textAlign: 'center' }}>{user?.bio}</div>
    </div>
  )
}

export default ProfileHeader
