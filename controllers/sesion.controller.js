const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');
const bd = require("../db/db");
const { encriptarPassword } = require('../helpers/handleBcrypt');

const nuevoUsuario = async (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    const passwordEncrip = await bcrypt.hash(req.body.password, 10); //Encriptación del password

    console.log(passwordEncrip);
    console.log(req.body.password);
    const values = [nombre, apellido, email, rol, passwordEncrip];
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, rol, password) VALUES (?, ?, ?, ?, ?)';
    const user = bd.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: `Error al crear el usuario ${passwordEncrip}` });
        }
        return res.status(200).json({ message: 'Usuario creado' });
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const values = [email];
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    bd.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuario = result[0];
        bcrypt.compare(password, result[0].password, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error al iniciar sesión' });
            }
            if (result) {
                const payload = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    rol: usuario.rol,
                    createdAt: moment().unix(),
                    expiredAt: moment().add(5, 'minutes').unix()
                }
                const token = jwt.encode(payload, 'secret');
                return res.status(200).json({
                    message: 'Usuario logueado', token: token
                });
            } else {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
        });
    });
}



// Función para la creación del token
const createToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    const token = jwt.encode(payload, process.env.JWT_SECRET);
    return token;
}

module.exports = { nuevoUsuario, login };
