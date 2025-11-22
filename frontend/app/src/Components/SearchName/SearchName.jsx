import './SearchName.css'
import { useNavigate } from 'react-router-dom'

export const SearchName = ({ user }) => {
  const navigate = useNavigate()
  const click = () => {
    navigate('/' + user.username)
  }

  return (
    <div
      className='search'
      onClick={() => click()}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s'
      }}
    >{user.username}
    </div>
  )
}
