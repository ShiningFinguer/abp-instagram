import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from '../../Components/Header/Header'

const Profile = () => {
  const { username } = useParams()
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${username}`)
      .then(res => {
        if (!res.ok) return console.log('Algo ha ido mal')

        return res.json()
      })
      .then(setUser)
      .catch(e => console.log(e.message))
  }, [])

  return (
    <div>
      <Header />
      {user ? (
        <>
          <ProfileHeader userProfile={user} />
          <ProfileTabs />
          <ProfilePosts posts={posts} userProfile={user} />
        </>
      ) : (
        <p>No existe este usuario</p>
      )}
    </div>
  )
}

export default Profile
