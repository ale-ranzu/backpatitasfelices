//Importo express
const express = require('express');

//Se intancia la aplicación express en app:
const app = express(); //express() es una función que devuelve un objeto. En este caso, express() devuelve un objeto que representa una aplicación Express.

//Definicion del puerto para el servidor
const PUERTO = 3000;


//Se monta un middleware que indica a express que sirva los archivos estaticos alojados en la carpeta public cada vez que llegue una solicitud a la url: urldelservidor/nombredelarchivo, ej: http://localhost:3000/index.html

/*
El código app.use(express.static('public')); se utiliza para servir archivos estáticos desde un directorio específico en tu servidor Express.

Cuando configuras Express de esta manera, estás indicando que deseas que Express sirva archivos estáticos, como HTML, imágenes, archivos CSS, JavaScript, etc., desde el directorio especificado ('public' en este caso) cada vez que se haga una solicitud a tu servidor.

Por ejemplo, si tienes un archivo HTML llamado index.html en el directorio public de tu proyecto, y tu servidor Express está configurado con app.use(express.static('public'));, entonces podrías acceder a ese archivo HTML simplemente navegando a http://tudominio.com/index.html en un navegador web.
*/

//Importo enrutadores creados en la carpeta routes para su montaje
const perritosRouter = require('../routes/perritos.routes');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Realizaste una solicitud GET a la ruta raiz");
});

/*Montaje de enrutador. Cualquier solicitud que coincida con estas rutas será manejada por este enrutador*/
app.use('/perritos', perritosRouter);


//agrego escuchador al servidor en el puerto especificado
app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto: ${PUERTO} - http://localhost:${PUERTO}`));