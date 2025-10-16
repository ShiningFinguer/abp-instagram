const User = require('./models/User')

const users = [
  { username: 'adri', password: 'password' },
  { username: 'rhian', password: 'password' },
  { username: 'sebas', password: 'password' },
]

async function fillUsers() {
  try {
    // Borrar usuarios existentes (opcional)
    await User.deleteMany({})

    // Insertar nuevos usuarios
    const createdUsers = await User.insertMany(users)
    console.log('Usuarios creados:', createdUsers.length)
  } catch (err) {
    console.error('Error creando usuarios:', err)
  }
}

module.exports = fillUsers
