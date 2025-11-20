import { useState, useEffect } from 'react'
import Comment from '../../Comment/Comment'
import Caption from '../../Comment/Caption'
import Like from '../Like/Like'

import commentIcon from '../../../Assets/comment.png'

import './PostModal.css'
import Comments from '../../Comments/Comments'
import { simpleTimeAgo } from '../../../utils'
import { API_URL } from '../../../constants'

const PostModal = ({ isOpen, post, onClose, userProfile }) => {
  const [isLike, setIsLike] = useState(false)
  const [countLikes, setCountLikes] = useState([])
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])
  const formattedCreatedAt = simpleTimeAgo(post.createdAt)

  useEffect(() => {
    fetch(`${API_URL}/api/posts/${post._id}/comments`)
      .then(res => {
        if (!res.ok) return console.log('Algo salio mal!')

        return res.json()
      })
      .then(setComments)
      .catch(e => console.log(e.message))
  }, [])

  useEffect(() => {
    async function countLikes() {
      const res = await fetch(`${API_URL}/api/post/` + post._id + '/likes', {
        method: 'get',
      })

      if (!res.ok) {
        console.log('error')
        return
      }

      const count = await res.json()

      setCountLikes(count)
    }

    countLikes()
      .then(() => console.log('bien'))
      .catch(e => console.log(e.message))
  }, [isLike])

  useEffect(() => {
    async function Liked() {
      const res = await fetch(`${API_URL}/api/post/` + post._id + '/isliked', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.token}`,
        },
      })

      if (!res.ok) {
        console.log('error')
        return
      }

      const liked = await res.json()

      setIsLike(liked.liked)
    }
    Liked()
  }, [])

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: comments?.length + 1,
        username: userProfile?.username,
        text: commentText,
        createdAt: 'Just now',
      }
      setComments([...comments, newComment])
      setCommentText('')
      setShowCommentInput(false)
    }
  }

  return (
    <>
      {isOpen && (
        <div className="PostModal" onClick={onClose}>
          <div className="PostModal-panel" onClick={e => e.stopPropagation()}>
            <img
              className="PostModal-img"
              src={`${API_URL}/uploads/` + post?.image}
              alt="post"
            />

            <div className="PostModal-body">
              <div className="PostModal-header">
                <img
                  src={post?.user?.avatar || 'https://i.pravatar.cc/300'}
                  alt="avatar"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <strong>{userProfile?.username}</strong>
              </div>

              <div className="PostModal-comments">
                {post?.description && (
                  <Caption
                    avatar={post?.user?.avatar}
                    username={post?.user?.username}
                    description={post.description}
                    createdAt={post.createdAt}
                  />
                )}

                {comments && <Comments comments={comments} />}
              </div>

              <div className="PostModal-footer">
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                    fontSize: '24px',
                    marginBottom: '10px',
                  }}
                >
                  <Like
                    isLike={isLike}
                    setIsLike={setIsLike}
                    postId={post._id}
                  />
                  <span
                    onClick={e => {
                      e.stopPropagation()
                      setShowCommentInput(!showCommentInput)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={commentIcon} className="icon" />
                  </span>
                </div>
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  {countLikes.likes} Me gusta
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#8e8e8e',
                    marginBottom: '10px',
                  }}
                >
                  {formattedCreatedAt}
                </div>

                {showCommentInput && (
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <input
                      type="textArea"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={e => setCommentText(e.target.value)}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          handleAddComment()
                        }
                      }}
                      style={{
                        flex: 1,
                        padding: '12px',
                        border: '1px solid #dbdbdb',
                        borderRadius: '4px',
                        outline: 'none',
                        height: '100px',
                        fontSize: '14px',
                      }}
                    />
                    <button
                      onClick={handleAddComment}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: commentText.trim()
                          ? '#0095f6'
                          : '#b2dffc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: commentText.trim() ? 'pointer' : 'not-allowed',
                        fontWeight: 'bold',
                        fontSize: '12px',
                      }}
                      disabled={!commentText.trim()}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostModal
