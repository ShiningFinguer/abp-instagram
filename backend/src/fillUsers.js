import User from './models/User.js';

const users = [
  { username: 'Qihao', email: 'prueba@gmail.com',password: 'password' },
  { username: 'Rhian',  email: 'prueba1@gmail.com',password: 'password' },
  { username: 'Adrian', email: 'prueba2@gmail.com', password: 'password' },
  { username: 'Sebaas',  email: 'prueba3@gmail.com',password: 'password' },
];

export async function fillUsers() {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log('Usuarios creados:', createdUsers.length);
  } catch (err) {
    console.error('Error creando usuarios:', err);
  }
}
