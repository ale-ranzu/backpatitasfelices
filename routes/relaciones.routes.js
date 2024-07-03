const { Router } = require('express');

const relacionesRouter = Router();

const relacionesControllers = require('../controllers/relaciones.controllers');

relacionesRouter.get("/postulaciones", relacionesControllers.solicitarPostulaciones);

relacionesRouter.delete("/postulaciones/:id_perrito", relacionesControllers.eliminarPostulaciones);

relacionesRouter.get("/adopciones", relacionesControllers.solicitarAdopciones);

relacionesRouter.post("/adopciones", relacionesControllers.agregarAdopcion); 

/* relacionesRouter.get("/adoptantes/:id/perritos", relacionesControllers.obtenerPerritosPorAdoptante); */

relacionesRouter.get("/perritos/:id/adoptantes", relacionesControllers.obtenerAdoptantesPorPerrito);

module.exports = relacionesRouter;