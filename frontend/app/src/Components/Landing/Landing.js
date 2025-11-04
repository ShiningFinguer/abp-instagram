import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div>
      <h1>Landing</h1>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/signup">Regitser</Link>
      </p>
    </div>
  )
}
