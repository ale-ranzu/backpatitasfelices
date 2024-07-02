
const { Router } = require('express');

const perritosRouter = Router();

const perritosControllers = require('../controllers/perritos.controllers');

const { checkToken } = require('../middlewares/checkToken');

perritosRouter.get("/", checkToken, perritosControllers.buscarTodos);

perritosRouter.get("/libre-en-proceso", perritosControllers.buscarLibreEnProceso);

perritosRouter.get("/:id", perritosControllers.buscarPorId);

perritosRouter.get("/filtrarporestado/:estadoAdopcion", perritosControllers.filtrarEstadoAdopcion);

perritosRouter.get("/filtrarportamano/:tamano", perritosControllers.filtrarPorTamaño);

perritosRouter.post("/", perritosControllers.agregarPerrito);

perritosRouter.put("/:id", perritosControllers.actualizar);

perritosRouter.put("/cambiarestado/:id", perritosControllers.cambiarEstadoAdopcion);

perritosRouter.delete("/:id", perritosControllers.borrarPorId);


module.exports = perritosRouter;