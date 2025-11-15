import React from 'react'
import userDefault from '../../Assets/userDefault.png'
import './Comment.css'
import { simpleTimeAgo } from '../../utils'

const Comment = ({ avatar, username, text, createdAt }) => {
  const formatedCreatedAt = simpleTimeAgo(createdAt)

  return (
    <li className="Comment">
      <img className="Comment-avatar" src={avatar || userDefault} />

      <div>
        <div>
          <strong>{username}</strong>
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
