import React from 'react'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '4px',
        padding: '20px',
      }}
    >
      {posts.map(post => (
        <ProfilePost key={post.id} post={post} userProfile={userProfile} />
      ))}
    </div>
  )
}

export default ProfilePosts
