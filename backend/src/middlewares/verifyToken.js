import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado o inválido' });
    }
  
    const token = authHeader.split(' ')[1]; // obtiene el token después de 'Bearer'
  
    try {
      const decoded = jwt.verify(token, 'SECRET_KEY');
      req.user = decoded; // guarda el usuario decodificado (por ej., { id: '123', email: '...' })
      next(); // continúa al controlador
    } catch (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  };