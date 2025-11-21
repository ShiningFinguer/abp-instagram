import mongoose from 'mongoose'

const FollowSchema = new mongoose.Schema({
  simp: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Follow', FollowSchema)
