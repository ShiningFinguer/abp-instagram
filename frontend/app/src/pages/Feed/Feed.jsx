import { useState, useEffect } from 'react'
import grayimage from '../../Assets/defaultPicture.PNG'
import defaultPicture from '../../Assets/userDefault.png'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'
import { NewPostModal } from '../../Components/NewPostModal/NewPostModal'
import PostModal from '../../Components/_Posts/Modal/PostModal'
import { API_URL } from '../../constants'

const Feed = ({ logOut }) => {
  const [posts, setPosts] = useState([])
  const [isOpenNewPostModal, setIsOPenNewPostModal] = useState(false)

  useEffect(() => {
    async function getAllPost() {
      const res = await fetch(`${API_URL}/api/post`)

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

  const handleDeletePost = postId => {
    setPosts(prevPosts => prevPosts.filter(p => p._id !== postId))
  }

  return (
    <>
      <Header setIsOPenNewPostModal={setIsOPenNewPostModal} logOut={logOut} />
      <Posts posts={posts} onDelete={handleDeletePost} />
      {isOpenNewPostModal && (
        <NewPostModal
          isOpen={isOpenNewPostModal}
          setIsOpen={setIsOPenNewPostModal}
          setPosts={setPosts}
        />
      )}
    </>
  )
}

export default Feed
