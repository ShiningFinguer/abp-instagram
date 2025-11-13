import Follow from "../models/Follow.js";


export const toggleFollow = async (req, res) => {
    try {
      const simp = req.user.id;
      const following = req.params.user;
  
      if (!simp) return res.status(401).json({ error: 'Necesita logearse' });

      // Comprobamos si el usuario ya esta siguiendo o no
      const followed = await Follow.findOne({ simp, following }); 
  
      if (followed) {
        // SI ya estas siguiendo, deja de seguir
        await Follow.deleteOne({ _id: followed._id });
        return res.status(200).json({ message: "Follow eliminado" });
      } else {
        // Si no estas siguiendo, empeiza a seguirlo
        const Follow = await Follow.create({ simp, following });
        return res.status(200).json({ message: "Follow añadido", Follow });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


export const isFollowed = async (req, res) =>  {
    try {
      const simp = req.user.id;
      const following = req.params.user;

      if (!simp) return res.status(200).json({ followed: false });

      // Comprobamos si el usuario ya esta siguiendo o no
      const followed = await Follow.findOne({ simp, following }); 
  
      if (followed) {
        return res.status(200).json({ followed: true });
      } else {
        return res.status(200).json({ followed: false  });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };