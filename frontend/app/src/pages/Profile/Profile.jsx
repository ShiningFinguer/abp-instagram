import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from '../../Components/Header/Header'
import { NewPostModal } from '../../Components/NewPostModal/NewPostModal'

const Profile = ({ logOut }) => {
  const { username } = useParams()
  const location = useLocation()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [itsMe, setItsMe] = useState(false)
  const token = sessionStorage.token
  const [isOpenNewPostModal, setIsOPenNewPostModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (token && !username) {
      fetch(`http://localhost:3001/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(user => {
          setUser(user)
          setItsMe(true)
        })
        .catch(e => {
          console.log(e.message)
          navigate('/')
        })

      fetch('http://localhost:3001/api/post/me', {
        headers: {
          Authorization: `Bearer ${sessionStorage.token}`,
        },
      })
        .then(res => res.json())
        .then(setPosts)
        .catch(e => console.log(e.message))
    }

    fetch(`http://localhost:3001/api/users/${username}`)
      .then(res => {
        if (!res.ok) return console.log('Algo ha ido mal')

        return res.json()
      })
      .then(setUser)

    fetch(`http://localhost:3001/api/post/${username}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    })
      .then(res => res.json())
      .then(setPosts)
      .catch(e => console.log(e.message))
  }, [location])

  // si el username de la barra de direcciones es el mio, entonces cambiamos estado itsMe
  useEffect(() => {
    if (user?.username && token) {
      fetch(`http://localhost:3001/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(me => {
          if (me.username === username) setItsMe(true)
        })
        .catch(console.error)
    }
  }, [user, username, token])

  useEffect(() => {
    fetch('http://localhost:3001/api/post/me', {
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`,
      },
    })
      .then(res => res.json())
      .then(setPosts)
      .catch(e => console.log(e.message))
  }, [])

  return (
    <>
      <Header setIsOPenNewPostModal={setIsOPenNewPostModal} logOut={logOut} />
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 0.75rem',
        }}
      >
        {user ? (
          <>
            <ProfileHeader user={user} itsMe={itsMe} />
            <ProfileTabs />
            <ProfilePosts posts={posts} userProfile={user} />
          </>
        ) : (
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
