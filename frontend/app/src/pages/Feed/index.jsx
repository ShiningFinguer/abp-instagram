import { useState, useEffect } from 'react'
import Header from 'components/Header'
import Posts from 'components/Posts'
import { NewPostModal } from 'components/NewPostModal'
import getAllPost from 'services/getAllPost'

const Feed = ({ logOut }) => {
  const [posts, setPosts] = useState([])
  const [isOpenNewPostModal, setIsOPenNewPostModal] = useState(false)

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )

  useEffect(() => {
    getAllPost()
      .then(setPosts)
  }, [])

  const handleDeletePost = postId => {
    setPosts(prevPosts => prevPosts.filter(p => p._id !== postId))
  }

  return (
    <>
      <Header setIsOPenNewPostModal={setIsOPenNewPostModal} logOut={logOut} />
      <Posts posts={sortedPosts} onDelete={handleDeletePost} />
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
