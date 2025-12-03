import Comment from 'components/Comment/Comment'
import './Comments.css'

export default function Comments ({ comments }) {
  return (
    <ul className='Comments'>
      {comments?.map(({ _id, text, userId: { username }, createdAt }) => (
        <Comment
          key={_id}
          username={username}
          text={text}
          createdAt={createdAt}
        />
      ))}
    </ul>
  )
}
