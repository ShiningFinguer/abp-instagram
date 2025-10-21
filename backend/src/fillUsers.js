import User from './models/User.js';

const users = [
  { username: 'Qihao', password: 'password' },
  { username: 'Rhian', password: 'password' },
  { username: 'Adrian', password: 'password' },
  { username: 'Sebaas', password: 'password' },
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
