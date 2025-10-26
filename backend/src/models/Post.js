import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  images: [
    {
      url: String,
      description: String,
      hashtags: [String],
      location: String,
      music: String
    }
  ],
  tags: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', PostSchema);
