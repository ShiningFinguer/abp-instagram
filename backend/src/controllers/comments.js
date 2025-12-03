import Comment from '../models/Comment.js'

export const postComment = async (req, res) => {
  try {
    const userId = req.user.id
    const { postId } = req.params
    const { text } = req.body
    const comment = await Comment.create({ userId, postId, text })
    if (!comment) {
      return res
        .status(404)
        .json({ error: 'No se ha podido crear el comentario' })
    }
    res.status(200).json({ message: 'Comentario subido', comment })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await Comment.find({ postId }).populate('userId')
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
