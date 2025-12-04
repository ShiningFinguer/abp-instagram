import { API_URL } from 'constants.js'

export default async function getPostsByToken ({ token }) {
  const res = await fetch(`${API_URL}/api/post/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  const posts = await res.json()

  return posts
}
