import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from '../../Components/Header/Header'
import { NewPostModal } from '../../Components/NewPostModal/NewPostModal'
import { API_URL } from '../../constants'

const Profile = ({ logOut }) => {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [itsMe, setItsMe] = useState(false)
  const token = window.localStorage.token
  const [isOpenNewPostModal, setIsOPenNewPostModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Si no hay username, cargamos MI perfil
        if (!username && token) {
          const meRes = await fetch(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })

          const me = await meRes.json()
          setUser(me)
          setItsMe(true)

          const postsRes = await fetch(`${API_URL}/api/post/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          setPosts(await postsRes.json())
          return
        }

        // Si hay username, cargamos el perfil de ese user
        const userRes = await fetch(`${API_URL}/api/users/${username}`)
        if (!userRes.ok) return navigate('/')

        const fetchedUser = await userRes.json()
        setUser(fetchedUser)

        // Revisar si soy yo SIN volver a pedir "me"
        if (fetchedUser.username) {
          const meRes = await fetch(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          const me = await meRes.json()
          setItsMe(me.username === fetchedUser.username)
        }

        // Posts de ese usuario
        const postsRes = await fetch(`${API_URL}/api/post/${username}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPosts(await postsRes.json())
      } catch (e) {
        console.log(e.message)
        navigate('/')
      }
    }

    fetchData()
  }, [navigate, token, username])

  return (
    <>
      <Header setIsOPenNewPostModal={setIsOPenNewPostModal} logOut={logOut} />
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 0.75rem'
        }}
      >
        {user
          ? (
            <>
              <ProfileHeader itsMe={itsMe} posts={posts} user={user} />
              <ProfileTabs />
              <ProfilePosts posts={posts} userProfile={user} />
            </>
            )
          : (
            <p>No existe este usuario</p>
            )}
        {isOpenNewPostModal && (
          <NewPostModal
            isOpen={isOpenNewPostModal}
            setIsOpen={setIsOPenNewPostModal}
            setPosts={setPosts}
          />
        )}
      </div>
    </>
  )
}

export default Profile
