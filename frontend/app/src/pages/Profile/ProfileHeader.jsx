import React, { useEffect, useState } from 'react'

const ProfileHeader = ({ user, itsMe }) => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [userProfile, setUserProfile] = useState([])
  const token = sessionStorage.token

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {/* Profile Picture */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={user?.avatar || 'https://i.pravatar.cc/300'}
          alt="Profile"
          style={{ width: '150px', height: '150px', borderRadius: '50%' }}
        />
      </div>

      {/* Username and Follow */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <h2>{user?.username}</h2>
        {!itsMe && <button>{isFollowing ? 'Unfollow' : 'Follow'}</button>}
      </div>

      {/* Profile Info */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <div>
          <strong>{user?.posts?.length}</strong> Posts
        </div>
        <div>
          <strong>{user?.followers?.length}</strong> Followers
        </div>
        <div>
          <strong>{user?.following?.length}</strong> Following
        </div>
      </div>

      {/* Name */}
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        {user?.username}
      </div>

      {/* Bio */}
      <div style={{ textAlign: 'center' }}>{user?.bio}</div>
    </div>
  )
}

export default ProfileHeader
