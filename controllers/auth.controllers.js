const bd = require('../db/db');

const jwt = require("jsonwebtoken"); //Importa el módulo jsonwebtoken para generar y verificar tokens JWT.

const bcrypt = require("bcryptjs"); //Importa el módulo bcryptjs para encriptar y verificar contraseñas.

const register = (req, res) => {
    const { nombre, apellido, email, rol, password } = req.body;
    console.log(email)
    const hashedPassword = bcrypt.hashSync(password, 8);
    const checkEmail = 'SELECT * FROM usuarios WHERE email= ?';
    const sql = 'INSERT INTO usuarios (nombre, apellido, email, rol, password) VALUES (?, ?, ?, ?, ?)';

    bd.query(checkEmail, [email], (err, resultCheck) => { //Siempre es una buena práctica pasar los valores en un array para evitar problemas de inyección SQL.
        if(err) {
            console.error('Error obtener usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if(resultCheck.length > 0) {
            return res.status(409).json({ error: 'Usuario ya existente' });
        };

        const valores = [nombre, apellido, email, rol, hashedPassword];

        bd.query(sql, valores, (err, result) => {
            if (err) {
                console.error('Error registrar usuario:', err); // Maneja errores que puedan ocurrir durante la ejecución de la consulta.
                return res.status(500).json({ error: 'Error interno del servidor' });
            };
            
            /* const token = jwt.sign({ id: result.insertId }, process.env.SECRET_KEY, { expiresIn: "3h" }); */
            
            res.status(201).json({ msg: 'Usuario registrado con éxito' });
        });
        console.log(req.body);

    });
    
}

const login = (req, res) => {
    const { email, password } = req.body;
    sql = 'SELECT * FROM usuarios WHERE email = ?';

    bd.query(sql, [email], (err, result) => {
        if(err) {
            console.error('Error obtener usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if(result.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        };
        const usuario = result[0];
        const valid = bcrypt.compareSync(password, usuario.password);
        if(!valid) {
            return res.status(401).json({ auth: false, token: null  });
        };
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, { expiresIn: "3h" });

        res.status(200).json({ auth: true, token });
    });
};

module.exports = {
    register,
    login,
}