import User from './models/User.js';

const users = [
  { username: 'qihao', password: 'password' },
  { username: 'qihao1', password: 'password' },
  { username: 'qihao2', password: 'password' },
  { username: 'qihao3', password: 'password' },
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
