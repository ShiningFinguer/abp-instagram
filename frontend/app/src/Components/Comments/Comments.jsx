import Comment from '../Comment/Comment'
import './Comments.css'

export default function Comments({ comments }) {
  return (
    <ul className="Comments">
      {comments?.map(({ text, userId: { username }, createdAt }) => (
        <Comment username={username} text={text} createdAt={createdAt} />
      ))}
    </ul>
  )
}
