import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  images: String,
  tags: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
  hashtags: [String],
  location: String,
  music: String,
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Post', PostSchema)
