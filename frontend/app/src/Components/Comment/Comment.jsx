import React from 'react'
import userDefault from '../../Assets/userDefault.png'
import './Comment.css'

const Comment = ({ username, text, createdAt }) => {
  return (
    <li className="Comment">
      <img className="Comment-avatar" src={userDefault} />

      <div>
        <div>
          <strong>{username}</strong>
          <span style={{ marginLeft: '8px' }}>{text}</span>
        </div>
        <div style={{ fontSize: '12px', color: 'grey', marginTop: '4px' }}>
          {createdAt}
        </div>
      </div>
    </li>
  )
}

export default Comment
