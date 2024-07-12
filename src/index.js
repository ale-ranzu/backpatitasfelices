require('dotenv').config();

const express = require("express");

const app = express(); //express() es una función que devuelve un objeto. En este caso, express() devuelve un objeto que representa una aplicación Express.

const cors = require('cors');

//Importo enrutadores creados en la carpeta routes para su montaje
const perritosRouter = require('../routes/perritos.routes');
const adoptantesRouter = require('../routes/adoptantes.routes');
const relacionesRouter = require('../routes/relaciones.routes');
const donacionesRouter = require("../routes/donaciones.routes");
const authRouter = require("../routes/auth.routes");

//Importo middleware multer para cargar las imagenes en el servidor
const upload = require('../middlewares/multerconfig');

//Definicion del puerto para el servidor
const PUERTO = 3000;

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion de cors para recibir solis desde el dominio http://127.0.0.1:5501

app.use(cors({
  origin: 'https://patitasfelices-omega.vercel.app',  
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Permitir el intercambio de credenciales (cookies, tokens)
}));

app.get("/", (req, res) => {
  res.send("Realizaste una solicitud GET a la ruta raíz");
});

/*Montaje de enrutador. Cualquier solicitud que coincida con estas rutas será manejada por este enrutador*/
app.use('/perritos', upload.single('url_img'), perritosRouter);
app.use('/adoptantes', upload.none(), adoptantesRouter);
app.use('/relaciones', relacionesRouter);
app.use('/donaciones', upload.none(), donacionesRouter);
app.use('/auth', authRouter);

//agrego escuchador al servidor en el puerto especificado
app.listen(PUERTO, () =>
  console.log(
    `Servidor corriendo en el puerto: ${PUERTO} - http://localhost:${PUERTO}`
  )
);
