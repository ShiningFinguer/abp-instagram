import { useState, useEffect } from 'react'
import grayimage from '../../Assets/defaultPicture.PNG'
import defaultPicture from '../../Assets/userDefault.png'
import Header from '../../Components/Header/Header'

import Posts from '../../Components/Posts/Posts'

const Feed = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function getAllPost() {
      const res = await fetch('http://localhost:3001/api/post')

      if (!res.ok) {
        console.log('error')

        return
      }

      const posts = await res.json()

      setPosts(posts)
    }

    getAllPost()
      .then(() => console.log('bien'))
      .catch(e => console.log(e.message))
  }, [])

  return (
    <>
      <Header />
      <Posts posts={posts} />
    </>
  )
}

export default Feed
