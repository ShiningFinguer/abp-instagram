import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // bcrypt/Argon2
  email: { type: String, unique: true, required: true },
  profilePic: { type: String, default: '' },
  bio: { type: String, default: '' },
  // privacy: { type: String, enum: ['public', 'private'], default: 'public' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
