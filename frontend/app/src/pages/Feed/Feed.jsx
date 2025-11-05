import { useState, useEffect } from 'react'
import grayimage from '../../Assets/defaultPicture.PNG'
import defaultPicture from '../../Assets/userDefault.png'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'

const dummyPosts = [
  {
    id: 1,
    imageURL: grayimage,
    caption: 'Beautiful mountain view! 🏔️',
    likes: ['user1', 'user2', 'user3'],
    comments: [
      { id: 1, username: 'alice', text: 'Amazing photo!', createdAt: '2h ago' },
      { id: 2, username: 'bob', text: 'Love it!', createdAt: '1h ago' },
    ],
    createdAt: '1 day ago',
    createdBy: {
      username: 'naturelover',
      profilePicURL: defaultPicture,
    },
  },
  {
    id: 2,
    imageURL: grayimage,
    caption: 'Nature is beautiful 🌿',
    likes: ['user1', 'user2'],
    comments: [
      { id: 3, username: 'charlie', text: 'Stunning!', createdAt: '3h ago' },
    ],
    createdAt: '2 days ago',
    createdBy: {
      username: 'explorer',
      profilePicURL: grayimage,
    },
  },
  {
    id: 3,
    imageURL: grayimage,
    caption: 'Sunset vibes 🌅',
    likes: ['user1'],
    comments: [],
    createdAt: '3 days ago',
    createdBy: {
      username: 'sunsetlover',
      profilePicURL: grayimage,
    },
  },
]

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
