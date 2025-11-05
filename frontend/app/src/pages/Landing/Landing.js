import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  return (
    <div class='Landing'>
      <div>
        <h1>Landing</h1>
        <p>
          <Link to="/login">Login</Link>
        </p>
        <p>
          <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  )
}
