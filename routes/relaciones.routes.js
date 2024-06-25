const { Router } = require('express');

const relacionesRouter = Router();

const relacionesControllers = require('../controllers/relaciones.controllers');

relacionesRouter.get("/asociar", relacionesControllers.asociarAdoptantePerrito);

relacionesRouter.get("/adoptantes/:id/perritos", relacionesControllers.obtenerPerritosPorAdoptante);

relacionesRouter.get("/perritos/:id/adoptantes", relacionesControllers.obtenerAdoptantesPorPerrito);

module.exports = relacionesRouter;