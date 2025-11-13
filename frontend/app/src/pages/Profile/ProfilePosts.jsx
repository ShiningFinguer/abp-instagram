import { useState, useEffect } from 'react'
import ProfilePost from './ProfilePost'

const ProfilePosts = ({ posts, userProfile }) => {
  if (posts.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '24px' }}>
        No posts
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, max-content))',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '20px',
      }}
    >
      {posts?.map(post => (
        <ProfilePost key={post._id} post={post} userProfile={userProfile} />
      ))}
    </div>
  )
}

export default ProfilePosts
