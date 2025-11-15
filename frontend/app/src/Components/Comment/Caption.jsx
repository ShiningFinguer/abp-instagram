import { simpleTimeAgo } from '../../utils'

const Caption = ({ avatar, username, description, createdAt }) => {
  const formatedCreatedAt = simpleTimeAgo(createdAt)

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <img
        src={avatar || 'https://i.pravatar.cc/300'}
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
          <strong style={{ fontSize: '14px' }}>{username}</strong>
          <span style={{ fontSize: '14px', marginLeft: '8px' }}>
            {description}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: '#8e8e8e', marginTop: '4px' }}>
          {formatedCreatedAt}
        </div>
      </div>
    </div>
  )
}

export default Caption
