import Post from "../models/Post.js";

// Subir Post
export const postPost = async (req, res) => {
  try {
    const { description, images, tags } = req.body;
    const post = await Post.create({ user: req.params.id, description, images, tags })
    if (!post) return res.status(404).json({ error: 'No hay ningún post' });
    res.status(200).json({ message: 'Post subido', post });
  } catch (err) {
    console.log(err)
<<<<<<< HEAD
    res.status(500).json({ error: err.message })
  }
}
// Obtener todos los Post
export const getPost = async (req, res) => {
  try {
    const post = await Post.find();
    if (post.length === 0) return res.status(404).json({ error: 'No hay ningún post' });
    res.json(post);
  } catch (err) {
=======
>>>>>>> 4930c2c774e3e177e58afdc0ef75e25947752368
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
    const {postId, images, tags } = req.body;
    const post = await Post.updateOne({ _id: postId }, { images, tags });
    res.status(200).json({ message: 'Post actualizada', post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete los Post de un User
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.deleteOne({ _id: postId });
    if (post.deletedCount === 0) return res.status(404).json({ error: 'No se ha podido borrar el post' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener todos los post
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
    if (!posts)
      return res.status(404).json({ error: 'Ningún post encontrado' })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
