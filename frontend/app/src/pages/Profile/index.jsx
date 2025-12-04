import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from 'components/Header'
import { NewPostModal } from 'components/NewPostModal'
import { API_URL } from 'constants.js'
import getUserByToken from 'services/getUserByToken'
import getPostsByToken from 'services/getPostsByToken'
import getUserByUsername from 'services/getUserByUsername'

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
          const user = await getUserByToken({ token })
          setUser(user)
          setItsMe(true)

          const posts = await getPostsByToken({ token })
          setPosts(posts)
          return
        }

        // Si hay username, cargamos el perfil de ese user
        const user = await getUserByUsername({ username })
        setUser(user)

        // Revisar si soy yo SIN volver a pedir "me"
        if (user.username) {
          const me = await getUserByToken({ token })
          setItsMe(me.username === user.username)
        }

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
