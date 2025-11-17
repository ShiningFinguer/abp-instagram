import Follow from '../models/Follow.js'
import User from '../models/User.js'

export const toggleFollow = async (req, res) => {
  try {
    const simp = req.user.id
    const userToFollow = req.params.userToFollow

    if (!simp) return res.status(401).json({ error: 'Necesita logearse' })

    if (!userToFollow)
      return res.status(404).json({ error: 'Falta el usuario a seguir' })

    const userToFollowDB = await User.findOne({ username: userToFollow })

    if (!userToFollowDB)
      return res.status(404).json({ error: 'Falta el usuario a seguir' })

    // Comprobamos si el usuario ya esta siguiendo o no
    const followed = await Follow.findOne({
      simp,
      following: userToFollowDB._id,
    })

    if (followed) {
      // Si ya estas siguiendo, deja de seguir
      await Follow.deleteOne({ _id: followed._id })
      return res.status(200).json({ message: 'Follow eliminado' })
    } else {
      // Si no estas siguiendo, empeiza a seguirlo
      const follow = await Follow.create({
        simp,
        following: userToFollowDB._id,
      })
      return res.status(200).json({ message: 'Follow añadido', follow })
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message })
  }
}

export const isFollowed = async (req, res) => {
  try {
    const simp = req.user.id
    const following = req.params.user

    if (!simp) return res.status(200).json({ followed: false })

    // Comprobamos si el usuario ya esta siguiendo o no
    const followed = await Follow.findOne({ simp, following })

    if (followed) {
      return res.status(200).json({ followed: true })
    } else {
      return res.status(200).json({ followed: false })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getFollowCounts = async (req, res) => {
  try {
    const username = req.params.user

    if (!username) return res.status(400).json({ error: 'Missing user parameter' })

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const userId = user._id

    // followers: people who follow this user -> Follow.following === userId
    const followersCount = await Follow.countDocuments({ following: userId })

    // following: people this user follows -> Follow.simp === userId
    const followingCount = await Follow.countDocuments({ simp: userId })

    return res.status(200).json({ followers: followersCount, following: followingCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: err.message })
  }
}

export const getFollowersCount = async (req, res) => {
  try {
    const username = req.params.user
    if (!username) return res.status(400).json({ error: 'Missing user parameter' })

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const followersCount = await Follow.countDocuments({ following: user._id })
    return res.status(200).json({ followers: followersCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: err.message })
  }
}

export const getFollowingCount = async (req, res) => {
  try {
    const username = req.params.user
    if (!username) return res.status(400).json({ error: 'Missing user parameter' })

    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const followingCount = await Follow.countDocuments({ simp: user._id })
    return res.status(200).json({ following: followingCount })
  } catch (err) {
    console.error(err.message)
    return res.status(500).json({ error: err.message })
  }
}
