export default function Home({ username }) {
  console.log(username)

  return (
    <div>
      <h1>Home</h1>
      <p>Bienvenido {username}</p>
    </div>
  )
}
