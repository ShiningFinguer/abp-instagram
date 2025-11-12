import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from './ProfileHeader'
import ProfileHeaderOwn from './ProfileHeaderOwn'
import ProfileTabs from './ProfileTabs'
import ProfilePosts from './ProfilePosts'
import Header from '../../Components/Header/Header'

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/users/${username}`)
      .then(res => {
        if (!res.ok) return console.log('Algo ha ido mal')

        return res.json()
      })
      .then(setUser)
      .catch(e => console.log(e.message))
  }, [])

  useEffect(() => {
    const fetchIsOwnProfile = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const res = await fetch("api/users/verifyMySelfProfile", {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
  
        const data = await res.json();
  
        data.verify ? setIsOwnProfile(true) : setIsOwnProfile(false);
  
      } catch (error){
        console.error("Error:", error);
      }
    }

    fetchIsOwnProfile();
  }, [])

  return (
    <div>
      <Header />
      {isOwnProfile? <ProfileHeaderOwn/> : <ProfileHeader userProfile={user}/>}
      <ProfileTabs />
      <ProfilePosts posts={posts} userProfile={user} />

    </div>
  )
}

export default Profile
