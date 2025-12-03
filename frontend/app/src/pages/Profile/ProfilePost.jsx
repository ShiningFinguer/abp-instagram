import React, { useState } from 'react'
import PostModal from 'components/_Posts/Modal/PostModal'
import { API_URL } from 'constants.js'

const ProfilePost = ({ post, userProfile }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        style={{
          cursor: 'pointer',
          aspectRatio: '1/1'
        }}
      >
        <img
          src={`${API_URL}/uploads/` + post.image}
          alt='post'
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
