import React from 'react'

// Función simple para mostrar "hace X tiempo"
const simpleTimeAgo = timestamp => {
  const seconds = Math.floor((Date.now() - new Date(timestamp)) / 1000)
  if (seconds < 60) return `${seconds} sec ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

const Caption = ({ post, userProfile, description }) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <img
        src={userProfile?.profilePicURL || 'https://i.pravatar.cc/300'}
        alt="avatar"
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
      />
      <div>
        <div>
          <strong style={{ fontSize: '14px' }}>{userProfile?.username}</strong>
          <span style={{ fontSize: '14px', marginLeft: '8px' }}>
            {description}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#8e8e8e', marginTop: '4px' }}>
          {post?.createdAt}
        </div>
      </div>
    </div>
  )
}

export default Caption
