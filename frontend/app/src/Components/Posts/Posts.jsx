import Post from '../Post/Post'
import './Posts.css'

export default function Posts({ posts }) {
  return (
    <div className="Posts">
      {posts.map(post => (
        <Post
          key={post._id}
          post={post}
          userProfile={post.createdBy}
          showHeader={true}
        />
      ))}
    </div>
  )
}
