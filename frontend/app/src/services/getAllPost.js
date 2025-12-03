import { API_URL } from 'constants.js'

export default async function getAllPost () {
  const res = await fetch(`${API_URL}/api/post`)

  if (!res.ok) {
    console.log('error')

    return
  }

  const posts = await res.json()

  return posts
}
