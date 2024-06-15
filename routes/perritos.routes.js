//Se importa la funcion Router desde express para crear instancias de rutas.
const { Router } = require('express');

//Creación de la Instancia del Enrutador, el enrutador me permite crear las instancias de rutas
const perritosRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes

const perritosControllers = require('../controllers/perritos.controllers');

/*
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
    
*/

//Creo los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controlodaras,  La ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida. 

perritosRouter.get("/", perritosControllers.buscarTodos);

perritosRouter.get("/:id", perritosControllers.buscarPorId);

perritosRouter.post("/", perritosControllers.agregarPerrito);

module.exports = perritosRouter;