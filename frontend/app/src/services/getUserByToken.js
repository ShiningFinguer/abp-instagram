import { API_URL } from 'constants.js'

export default async function getUserByToken ({ token }) {
  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const user = await res.json()

  return user
}
