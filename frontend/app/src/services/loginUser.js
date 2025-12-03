import { API_URL } from 'constants.js'

export default async function loginUser ({ username, password }) {
  const res = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })

  if (!res.ok) {
    const { error } = await res.json()

    throw new Error(error)
  }

  const { token } = await res.json()

  return token
}
