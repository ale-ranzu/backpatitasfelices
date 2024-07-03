//Se importa la funcion Router desde express para crear instancias de rutas.
const { Router } = require('express');

//Creación de la Instancia del Enrutador, el enrutador me permite crear las instancias de rutas
const perritosRouter = Router();

//Se deben importar los controladores para asociarlos a las rutas correspondientes

const perritosControllers = require('../controllers/perritos.controllers');

const { checkToken } = require('../middlewares/checkToken');

/*
    buscarTodos,
    agregar,
    buscarPorId,
    actualizar,
    borrar,
    
*/

//Creo los endpoint para el manejo de solicitudes HTTP:

//En cada solicitud se pasa la referencia a las funciones controlodaras, la ejecución se realiza automáticamente por Express cuando una solicitud coincide con la ruta definida. 

perritosRouter.get("/", checkToken, perritosControllers.buscarTodos);

perritosRouter.get("/libre-en-proceso", perritosControllers.buscarLibreEnProceso);

perritosRouter.get("/:id", perritosControllers.buscarPorId);

perritosRouter.get("/filtrarporestado/:estadoAdopcion", perritosControllers.filtrarEstadoAdopcion);

perritosRouter.get("/filtrarportamano/:tamano", perritosControllers.filtrarPorTamaño);

/* perritosRouter.get("/obtenerpostulantes", perritosControllers.obtenerPostulantes); */

perritosRouter.post("/", perritosControllers.agregarPerrito);

perritosRouter.put("/:id", perritosControllers.actualizar);

perritosRouter.put("/cambiarestado/:id", perritosControllers.cambiarEstadoAdopcion);

perritosRouter.delete("/:id", perritosControllers.borrarPorId);


module.exports = perritosRouter;