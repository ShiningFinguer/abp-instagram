const User = require('./models/User')

const users = [
  { name: 'Adrian', email: 'adrian@example.com', age: 25 },
  { name: 'Laura', email: 'laura@example.com', age: 30 },
  { name: 'Carlos', email: 'carlos@example.com', age: 28 },
  { name: 'Marta', email: 'marta@example.com', age: 22 },
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
