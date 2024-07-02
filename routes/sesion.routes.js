const { Router } = require('express');

const sesionRouter = Router();

const { nuevoUsuario, login } = require('../controllers/sesion.controller');

sesionRouter.post("/", nuevoUsuario);
sesionRouter.post("/login", login);


module.exports = sesionRouter;