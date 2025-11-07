import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Acceso denegado' })

  try {
    const { id } = jwt.verify(token, 'SECRET_KEY')
    req.userId = id
    next()
  } catch (err) {
    res.status(400).json({ message: 'Token inválido' })
  }
}
