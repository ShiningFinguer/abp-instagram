import { simpleTimeAgo } from '../../utils'
import userDefault from '../../Assets/userDefault.png'
import { API_URL } from '../../constants'

const Caption = ({ avatar, username, description, createdAt }) => {
  const formatedCreatedAt = simpleTimeAgo(createdAt)

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <img
        src={avatar ? `${API_URL}/avatars/${avatar}` : userDefault}
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
