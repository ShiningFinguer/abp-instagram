import React from 'react'
import userDefault from '../../Assets/userDefault.png'
import './Comment.css'
import { simpleTimeAgo } from '../../utils'
import { Link } from 'react-router-dom'

const Comment = ({ avatar, username, text, createdAt }) => {
  const formatedCreatedAt = simpleTimeAgo(createdAt)

  return (
    <li className="Comment">
      <Link to={`/${username}`}>
        <img className="Comment-avatar" src={avatar || userDefault} />
      </Link>

      <div>
        <div>
          <span className="Comment-username">
            <Link to={`/${username}`}>
              <strong style={{ fontSize: '14px' }}>{username}</strong>
            </Link>
          </span>
          <span style={{ marginLeft: '8px' }}>{text}</span>
        </div>
        <div style={{ fontSize: '12px', color: 'grey', marginTop: '4px' }}>
          {formatedCreatedAt}
        </div>
      </div>
    </li>
  )
}

export default Comment
