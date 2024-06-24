//Se importa la funcion Router desde express para crear instancias de rutas.
const { Router } = require('express');

//Creación de la Instancia del Enrutador, el enrutador me permite crear las instancias de rutas
const adoptantesRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes

const adoptantesControllers = require('../controllers/adoptantes.controllers');

/*
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
    buscarPorIDPerrito
*/

//Creo los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controlodaras,  La ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida. 

adoptantesRouter.get("/", adoptantesControllers.buscarTodosAdoptantes);

adoptantesRouter.get("/:id", adoptantesControllers.buscarPorIdAdoptantes);

adoptantesRouter.post("/", adoptantesControllers.agregarAdoptante);

adoptantesRouter.put("/:id", adoptantesControllers.actualizarAdoptante);

adoptantesRouter.delete("/:id", adoptantesControllers.borrarPorIdAdoptante);

module.exports = adoptantesRouter;