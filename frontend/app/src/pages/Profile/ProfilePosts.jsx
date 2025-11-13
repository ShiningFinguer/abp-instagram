import { useState, useEffect } from 'react'
import ProfilePost from './ProfilePost'

const ProfilePosts = ({ posts, userProfile }) => {
  return (
    <>
      {posts.length ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(200px, max-content))',
            justifyContent: 'center',
            gap: '0.75rem',
            padding: '20px',
          }}
        >
          {posts?.map(post => (
            <ProfilePost key={post._id} post={post} userProfile={userProfile} />
          ))}
        </div>
      ) : (
        <p>Este usuario aún no tiene posts que mostrar</p>
      )}
    </>
  )
}

export default ProfilePosts
