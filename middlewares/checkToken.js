const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

    if (!req.headers.token) {
        return res.json({ error: 'No se ha encontrado el token' });
    }

    const userToken = req.headers.token;
    let payload = {};

    try {
        payload = jwt.decode(userToken, process.env.JWT_SECRET);
    } catch (err) {
        return res.json({ error: 'Token incorrecto' });
    }

    if (payload.expiredAt < moment().unix()) {
        return res.json({ error: 'Token expirado' });
    }

    req.usuarioId = payload.usuarioId;
    next();
}

module.exports = {
    checkToken
}