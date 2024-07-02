//Importo express 
const express = require("express");

const formData = require("express-form-data");
const os = require("os");


//Importación de DOTENV para manejo de variables de entorno
const dotenv = require('dotenv');

const cors = require('cors');

//Se intancia la aplicación express en app:
const app = express(); //express() es una función que devuelve un objeto. En este caso, express() devuelve un objeto que representa una aplicación Express.

//Inicialización de dotenv
dotenv.config();

//Importo enrutadores creados en la carpeta routes para su montaje
const perritosRouter = require('../routes/perritos.routes');
const adoptantesRouter = require('../routes/adoptantes.routes');
const relacionesRouter = require('../routes/relaciones.routes');
const donacionesRouter = require("../routes/donaciones.routes");
const sesionRouter = require('../routes/sesion.routes');

//Importo middleware multer para cargar las imagenes en el servidor
const upload = require('../middlewares/multerconfig');

//Definicion del puerto para el servidor
const PUERTO = 3000;

app.use(express.static('public'));

/*
El código app.use(express.static('public')); se utiliza para servir archivos estáticos desde un directorio específico en el servidor Express.

Cuando configuras Express de esta manera, estás indicando que deseas que Express sirva archivos estáticos, como HTML, imágenes, archivos CSS, JavaScript, etc., desde el directorio especificado ('public' en este caso) cada vez que se haga una solicitud a tu servidor.

Por ejemplo, si tienes un archivo HTML llamado index.html en el directorio public de tu proyecto, y tu servidor Express está configurado con app.use(express.static('public'));, entonces podrías acceder a ese archivo HTML simplemente navegando a http://tudominio.com/index.html en un navegador web.
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Permitir el intercambio de credenciales (cookies, tokens)
}));


const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

app.get("/", (req, res) => {
  res.send("Realizaste una solicitud GET a la ruta raíz");
});

app.post("/", (req, res) => {
  res.send("Realizaste una solicitud POST a la ruta raíz");
});

/*Montaje de enrutador. Cualquier solicitud que coincida con estas rutas será manejada por este enrutador*/
app.use('/perritos', upload.single('url_img'), perritosRouter);
app.use('/adoptantes', upload.none(), adoptantesRouter);
app.use('/relaciones', relacionesRouter);
app.use('/donaciones', donacionesRouter);
app.use('/sesion', sesionRouter);


//agrego escuchador al servidor en el puerto especificado
app.listen(PUERTO, () =>
  console.log(
    `Servidor corriendo en el puerto: ${PUERTO} - http://localhost:${PUERTO}`
  )
);
