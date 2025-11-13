import React, { useState } from 'react'
import PostModal from '../../Components/_Posts/Modal/PostModal'

const ProfilePost = ({ post, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          cursor: 'pointer',
          aspectRatio: '1/1',
        }}
      >
        <img
          src={'http://localhost:3001/uploads/' + post.image}
          alt="post"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {isOpen && (
        <PostModal
          isOpen={isOpen}
          post={post}
          userProfile={userProfile}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default ProfilePost
