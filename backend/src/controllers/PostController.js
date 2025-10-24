import Post from "../models/Post.js";

// Subir Post
export const postPost = async (req, res) => {
  try {
    const { images, tags } = req.body;
    const post = await Post.create({ user: req.params.id, images, tags })
    if (!post) return res.status(404).json({ error: 'No hay ningún post' });
    res.status(200).json({ message: 'Post subido', post });
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener los Post de un User
export const getUserPost = async (req, res) => {
  try {
    const post = await Post.find({ user: req.params.id });
    if (post.length === 0) return res.status(404).json({ error: 'No hay ningún post' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update los Post de un User
export const updatePost = async (req, res) => {
  try {
    const {postID, images, tags } = req.body;
    const post = await Post.updateOne({ _id: postID }, { images, tags });
    res.status(200).json({ message: 'Post actualizada', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete los Post de un User
export const deletePost = async (req, res) => {
  try {
    const { postID } = req.body;
    const post = await Post.deleteOne({ _id: postID });
    if (post.deletedCount === 0) return res.status(404).json({ error: 'No se ha podido borrar el post' });    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
