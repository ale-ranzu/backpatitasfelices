const { Router } = require('express');

const sesionRouter = Router();

const { nuevoUsuario, login } = require('../controllers/sesion.controller');
const { checkToken } = require('../middlewares/checkToken');

sesionRouter.post("/", nuevoUsuario);
sesionRouter.post("/login", login);
sesionRouter.get("/", checkToken)


module.exports = sesionRouter;