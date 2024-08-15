# MINI BOT CONVERSACIONAL (CHATBOT)

Creado por Ximena Gdur Vargas.

Este ejercicio consiste en desarrollar un Bot conversacional o Chatbot, el cual deberá responder a al menos 10 consultas realizadas por el usuario.

## Características del Chatbot

- Se puede ejecutar desde cualquier navegador web.
- La ventana del chat permite al usuario digitar las consultas que desea hacer al bot.
- El procesamiento de la consulta no tarda más de 5 segundos después de haber enviado el mensaje.
- El bot realiza un nivel bajo de contextualización de la consulta del usuario, indicando al usuario si la consulta que realiza no fue comprendida, o si corresponde a alguna de las posibles consultas que puede responder.
- Las consultas que responde el bot estan almacenadas en una base de datos no SQL llamada MongoDB. Para configurar esta conexión se debe editar el archivo index.ts ubicado en la carpeta server.
- La comunicación entre el bot y la base de datos se realiza por medio de Express.js para el servidor y axios para la parte del cliente.
- Buenas prácticas aplicadas para asegurar interacciones seguras al usar RESTful APIs.
    - Se validan el input de los usuarios del lado del cliente y del lado del servidor.
    - Se esta utilizando typescript para validar el tipo de dato.

## Aprendizaje del chatbot

Actualmente se cuenta con una base de datos que almacena las posibles respuestas que el bot puede contestar. Para expandir la lista de preguntas que el robot puede contestar se debe ingresar a la base de datos en MongoDB e ingresar desde la intefaz preguntas nuevas con su respectiva respuesta.

## Decisiones de Diseño

Se decidio utilizar el conjunto de tecnologías MERN que consiste en MongoDB, Express.js, React y Node.js. Además, de esto se escogió utilizar la arquitectura MVC y una base de datos NOSQL enfocada en documentos.

Esto permite que la solución:
- Sea ordenada.
- Sea fácil de mantener al encapsular las funciones de cada capa, lo que permite extender y modificar una capa sin que afecte otras.
- Sea escalable al pensar que en un futuro se puede escalar horizontalmente (agregar nodos adicionales para manejar varias consultas al mismo tiempo)


## Posibles mejoras

- Hay varios paquetes que son vulnerabilidades.
- Mejorar la seguridad al encriptar los mensajes del servidor al cliente y usar tokens de autenticación.
- Mejor manejo de errores.
- Uso del cache para la respuesta default.
- Realizar pruebas sobre el código.
- Forma más fácil de ingresar respuestas nuevas.

## Pasos para configurar el proyecto

### Configurar base de datos
1. Descargar [MongoDB](https://www.mongodb.com/products/self-managed/community-edition).
2. Configurar conexión en 
    `mongodb://localhost:27017`
3. Crear una base de datos que se llame Chatbot y una colección que se llame Question.
4. Importar datos usando el archivo ubicado en la carpeta principal llamado test-data.txt

### Configurar el proyecto.

Correr dos scripts:
- Uno para el servidor:
    - Ubicarse en la carpeta server y ejecutar el comando `npm install & npm start`
- Uno para el cliente:
    - Ubicarse en la carpeta client y ejecutar el comando `npm install & npm start`

### Para debugear usar Postman
Hacer las consultas con el URL: `http://localhost:5000/api/questions`