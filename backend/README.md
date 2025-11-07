# Rutas

## Users

- Obtener todos los usuarios

  - GET /api/users

- Registrar un nuevo usuario

  - POST /api/users

- Autenticar usario

  - POST /api/users/login

- Obtener mi usuario (token)

  - GET /api/users/me

- Actualizar datos del usuario (token)

  - PUT /api/users/me/profile

- Actualizar contraseña del usuario (token)

  - PUT /api/users/me/password

- Eliminar usuario (token)

  - DELETE /api/users

## Posts

- Obtener todos los posts

  - GET /api/post

- Crear un nuevo post

  - POST /api/post/:id (cambiar por token)

- Obtener todos los post del user (token)

  - GET /api/post/me

- Actualizar post

  - PUT /api/post (agregar por token)

- Eliminar post

  - DELETE /api/post (agregar por token)
