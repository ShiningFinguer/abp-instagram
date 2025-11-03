import Like from "../models/Like.js";
import Post from "../models/Post.js";

// Dar o quitar like a un post
export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.params.id; // el ID del usuario que da el like

    // Verificamos que el post exista
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "El post no existe" });

    // Comprobamos si el usuario ya ha dado like
    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      // Si ya existe, quitamos el like
      await Like.deleteOne({ _id: existingLike._id });
      return res.status(200).json({ message: "Like eliminado" });
    } else {
      // Si no existe, creamos el like
      const like = await Like.create({ postId, userId });
      return res.status(200).json({ message: "Like añadido", like });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Contar likes de un post
export const countLikes = async (req, res) => {
  try {
    const postId = req.params.postId;
    const count = await Like.countDocuments({ postId });
    res.status(200).json({ postId, likes: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
