import { API_URL } from 'constants.js'

export default async function getUserByUsername ({ username }) {
  const res = await fetch(`${API_URL}/api/users/${username}`)

  if (!res.ok) throw new Error('No se ha podido obtener el usuario')

  const user = await res.json()

  return user
}
