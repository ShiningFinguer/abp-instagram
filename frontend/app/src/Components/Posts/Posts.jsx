import Post from '../Post/Post'
import './Posts.css'

export default function Posts ({ posts, onDelete }) {
  return (
    <div className='Posts'>
      {posts.map(post => (
        <Post key={post._id} post={post} onDelete={onDelete} />
      ))}
    </div>
  )
}
