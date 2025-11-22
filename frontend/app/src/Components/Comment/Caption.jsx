import { simpleTimeAgo } from '../../utils'
import userDefault from '../../Assets/userDefault.png'
import { API_URL } from '../../constants'
import { Link } from 'react-router-dom'
import './Caption.css'

const Caption = ({ avatar, username, description, createdAt }) => {
  const formatedCreatedAt = simpleTimeAgo(createdAt)

  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      <Link to={`/${username}`}>
        <img
          src={avatar ? `${API_URL}/avatars/${avatar}` : userDefault}
          alt='avatar'
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
      </Link>
      <div>
        <div>
          <span className='Caption-username'>
            <Link to={`/${username}`}>
              <strong style={{ fontSize: '14px' }}>{username}</strong>
            </Link>
          </span>
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
