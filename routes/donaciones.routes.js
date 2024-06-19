//Importamos la función Router desde express para crear instancias de rutas.

const { Router } = require('express');

//Creamos la Instancia del enrutador

const donacionesRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes

const donacionesController = require('../controllers/donaciones.controllers');

/*
    buscarTodos,
    buscarPorId,
    registrarDonacion,
*/

//Creamos los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controladoras, la ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida.

donacionesRouter.get("/", donacionesController.buscarTodos);

donacionesRouter.get("/:id", donacionesController.buscarPorId);

donacionesRouter.get("/", donacionesController.registrarDonacion);

module.exports = donacionesRouter;
