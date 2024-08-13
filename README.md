# MINI BOT CONVERSACIONAL (CHATBOT) 
Este ejercicio consiste en desarrollar un Bot conversacional o Chatbot, el cual deberá responder a al menos 10 consultas realizadas por el usuario.

## Características del Chatbot

- Se puede ejecutar desde cualquier navegador web.
- La ventana del chat permite al usuario digitar las consultas que desea hacer al bot.
- El procesamiento de la consulta no tarda más de 5 segundos después de haber enviado el mensaje.
- El bot realiza un nivel bajo de contextualización de la consulta del usuario, indicando al usuario si la consulta que realiza no fue comprendida, o si corresponde a alguna de las posibles consultas que puede responder.
- Las consultas que responde el bot estan almacenadas en una base de datos no SQL llamada MongoDB. Para configurar esta conexión se debe editar el archivo index.js ubicado en la carpeta server.
- La comunicación entre el bot y la base de datos se realiza por medio de Express.js para el servidor y axios para la parte del cliente.
- Buenas prácticas aplicadas para asegurar interacciones seguras al usar RESTful APIs.
    - Se utiliza HTTPS en todas las interacciones para encripttar los datos.
    - Se validan el input de los usuarios del lado del cliente y del lado del servidor.
    - Se esta utilizando typescript para validar el tipo de dato.

## Decisiones de Diseño


## Elección de componentes


## Posibles mejoras


## ¿Como correrlo?

Correr dos scripts:
- Uno para el servidor:
    - Ubicarse en la carpeta server y ejecutar el comando `npm start`
- Uno para el cliente:
    - Ubicarse en la carpeta client y ejecutar el comando `npm start`