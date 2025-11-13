import { useEffect, useState } from 'react'
import { redirect, useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileHeaderOwn from './ProfileHeaderOwn'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from '../../Components/Header/Header'

const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [itsMe, setItsMe] = useState(false)
  const token = sessionStorage.token

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
          redirect('/')
        })

      return
    }

    fetch(`http://localhost:3001/api/users/${username}`)
      .then(res => {
        if (!res.ok) return console.log('Algo ha ido mal')

        return res.json()
      })
      .then(setUser)
  }, [])

  return (
    <div>
      <Header />
      <ProfileHeader itsMe={itsMe} />
      {token ? (
        <h1>
          Username: {user?.username} <br /> email: {user?.email}
        </h1>
      ) : null}
      {/* <ProfileTabs /> */}
      {/* <ProfilePosts posts={posts} userProfile={user} /> */}
    </div>
  )
}

export default Profile
