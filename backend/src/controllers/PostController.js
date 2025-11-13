import Post from '../models/Post.js'

// Subir Post
export const postPost = async (req, res) => {
  try {
    const filename = req?.file?.filename

    if (!filename) return res.status(400).json({ error: 'Falta la imagen' })

    const { description, tags } = req.body
    const userId = req.user.id
    const post = await Post.create({
      user: userId,
      description,
      image: filename,
      tags,
    })
    if (!post) return res.status(404).json({ error: 'No hay ningún post' })
    res.status(200).json({ message: 'Post subido', post })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

// Obtener todos los post
export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', { username: true })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Obtener todos los Posts de un User
export const getUserPost = async (req, res) => {
  try {
    const id = req.user.id
    const post = await Post.find({ user: id }).populate('user', {
      username: true,
    })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Update los Post de un User
export const updatePost = async (req, res) => {
  try {
    const { postId, images, tags } = req.body
    const post = await Post.updateOne({ _id: postId }, { images, tags })
    res.status(200).json({ message: 'Post actualizada', post })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Delete los Post de un User
export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;        // ID del post desde la URL
    const userId = req.user.id;          // ID del usuario logueado (del token)

    //Buscar el post en la BBDD
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }

    // Comprovar que el usuario logueado sea el que creo ese post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ error: 'No tienes permiso para borrar este post' });
    }

    // Borramos post
    await Post.deleteOne({ _id: postId });

    res.status(200).json({ message: 'Post eliminado correctamente' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
