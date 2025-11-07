import Comment from "../models/Comment";


export const postComment = async (req, res) => {
    try {
        const userId = req.user.id; // viene del token
        const { postId, text } = req.body;
        const comment = await Comment.create({ userId, postId, text })
        if (!comment) return res.status(404).json({ error: 'No hay ningún comentario' });
        res.status(200).json({ message: 'COmentario subido', comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.body;
        const comments = await Comment.find({ postId })
        if (comments.length === 0) return res.status(404).json({ error: 'No hay ningún comentario' });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


