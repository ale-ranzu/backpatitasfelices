const { Router } = require('express');

const authController = require('../controllers/auth.controllers');

const authMiddleware = require('../middlewares/authMiddleware');

const authRouter = Router();

authRouter.post('/register', authController.register); 

authRouter.post('/login', authController.login);

authRouter.get('/protected', authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
});


module.exports = authRouter;