INSTRUCCIONES DE INSTALACION

- Clonar repositorio y abrir con editor de código, por ej. VSC.
- Instalar dependencias express, redis, node-fetch, path, method-Override.

INSTRUCCIONES DE INSTALACION

- Iniciar Servidor Redis en terminal con comando: redis-server
- Iniciar aplicación en una segunda terminal con comandos: node index.js
- En navegador ingresar a http://localhost:3000/ y podrán visalizar el form.
- En el input "Url a buscar" introduce la siguiente url: http://localhost:3000/proxy?url=https%3A%2F%2Fjsonplaceholder.typicode.com%2Fposts%2F1
- Probar con una url incorrecta dentro de la query string, para probar validación de la URL.
- Si observamos en la terminal donde iniciamos la app, veremos que nos indica la url a la que estamos conectandonos y también si se está cargando desde servidor, o desde cache.
- Ídem para el boton rojo "Reset", podremos observar en consola de la misma terminal como se vacía el contenido de cache con el texto "No content".
- Por útlimo, luego de haber vaciado el cache (o al pasar 5 minutos), la petición se realizará al servidor nuevamente.

P.d: Muchas gracias al Team de Streaver, tanto Federico como Fabián por el voto de confianza en mi y por su tiempo invertido. Han sido días muy intensos para mí, pero a la vez, de un aprendizaje tremendo!

Mathías
