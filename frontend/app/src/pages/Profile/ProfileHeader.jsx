import { useEffect, useState } from 'react'
import { API_URL } from '../../constants'
import { EditProfileForm } from '../../Components/EditProfileForm/EditProfileForm'
import userDefault from '../../Assets/userDefault.png'
import { useNavigate } from 'react-router-dom'

const ProfileHeader = ({ user, itsMe }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [showEditForm, setShowEditForm] = useState(false)
  const token = window.localStorage.token
  const navigate = useNavigate()

  // Cargar datos de follow y contadores
  useEffect(() => {
    if (!user?.username || !token) return

    const fetchData = async () => {
      try {
        // Saber si lo sigo
        const followRes = await fetch(
          `${API_URL}/api/users/${user.username}/follow`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        const { followed } = await followRes.json()
        setIsFollowing(followed)

        // Contadores
        const [followersRes, followingRes] = await Promise.all([
          fetch(`${API_URL}/api/users/${user.username}/followers/count`),
          fetch(`${API_URL}/api/users/${user.username}/following/count`)
        ])
        const followersData = await followersRes.json()
        const followingData = await followingRes.json()
        setFollowers(followersData.followers ?? 0)
        setFollowing(followingData.following ?? 0)
      } catch (err) {
        console.error('Error loading profile data:', err)
        setFollowers(0)
        setFollowing(0)
      }
    }

    fetchData()
  }, [user, token])

  // Manejar follow/unfollow
  const handleFollowClick = async () => {
    if (!token) return navigate('/login')
    if (!user) return console.log('No hay usuario')

    try {
      const res = await fetch(`${API_URL}/api/users/${user.username}/follow`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        const error = await res.json()
        return console.log(error)
      }

      // Actualizar estado local correctamente
      setIsFollowing(prev => {
        setFollowers(f => (prev ? f - 1 : f + 1))
        return !prev
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem'
      }}
    >
      {/* Profile Picture */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={
            user.profilePic
              ? user.profilePic
              : userDefault
          }
          alt='Profile'
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>

      {/* Username and Follow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <h2>{user?.username}</h2>
        {itsMe
          ? (
            <button onClick={() => setShowEditForm(true)}>Editar perfil</button>
            )
          : (
            <button onClick={handleFollowClick}>
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
            )}
      </div>

      {/* Bio */}
      <div style={{ textAlign: 'center' }}>{user?.bio}</div>

      {/* Profile Info */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div>
          <strong>{user?.posts}</strong> Posts
        </div>
        <div>
          <strong>{followers}</strong> Followers
        </div>
        <div>
          <strong>{following}</strong> Following
        </div>
      </div>

      {showEditForm && (
        <EditProfileForm onClose={() => setShowEditForm(false)} />
      )}
    </div>
  )
}

export default ProfileHeader
