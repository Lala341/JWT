# JWT-Example

## Para desplegar la aplicación:

- Moverse a la carpeta raiz jwt
- Ejecutar npm install en consola
- Crear coleccion de mongo "Usuarios" (use Usuarios).

Nota: La aplicación corre en una base de datos local mongo db en el puerto 27017, la colección y base de datos recibe el nobre de Usuarios, si no existen registros se agregan 3 usuarios por defecto.



usuario1
contraseña: usuario1

usuario2
contraseña: usuario2

usuario3
contraseña: usuario3



Cuando un usuario intenta logearse, se genera un toquen que se guarda en la BD y será el que se verificará posteriormente. La estructura de la BD Usuario es la siguente:


{ _id: 5dadfae6ae23e25cbf585f18,
  username: 'usuario2',
  password: '2fb6c8d2f3842a5ceaa9bf320e649ff0',
  token:
   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzdWFyaW8yIiwiaWF0IjoxNTcxNzUxMDc2LCJleHAiOjE1NzE4Mzc0NzZ9.Qiul0724M8k8WKhBkRlkBwPxY-8wswroSwkFD5cDRbw',
  role: 'EDITOR' }


La contraseña se encripta con el algoritmo de md5. Adicionalmente, existien 3 roles:
ADMINSITRADOR, EDITOR y USUARIO.


Asi mismo, se crearon dos rutas adicionales eventos POST que permite crear eventos solo disponible para usuarios ADMINISTRADORES, eventos accesible a todos los usuarios y perfil accesisible solo a editores y usuarios.

Modelo evento:

{
  "nombre": "Evento de visita",
  "descripcion": "Evento de visita al vaticano",
  "duracion": "2 horas"
}

Si se realizan pruebas sobre postman para el caso de métodos POST recordar que el cuerpo de la petición debe tener el formato JSON(aplication/json)