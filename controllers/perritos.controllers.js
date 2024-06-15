
//El objeto db posee los métodos para conectar con la base de datos. Es la conexión a la base de datos.

const bd = require('../db/db');

const buscarTodos = (req, res) => {
    const sql = 'SELECT * FROM perritos'
    
    bd.query(sql, (err, result) => {
        if(err) {
            console.log('Error de conexion con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        } 
        res.json(result);
    });
};

const buscarPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM perritos WHERE id = ?'
    
    bd.query(sql, [id], (err, result) => {
        if(err) {
            console.log('Error de conexion con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexion con la base de datos' });
        } 
        if(result.length === 0) {
            console.log('Recurso no encontrado');
            return res.status(404).json({msg:" El recurso solicitado no se encuentra en la base de datos"});
        }
        res.json(result[0]);
    });
};

const agregarPerrito = (req, res) => {
    const { nombre, genero, edad, condicion_medica, tamaño } = req.body;

    const sql = 'INSERT INTO perritos (nombre, genero, edad, condicion_medica, tamaño) VALUES (?, ?, ?, ?, ?)'
    
    bd.query(sql, [nombre, genero, edad, condicion_medica, tamaño], (err, result) => {
        if(err) {
            console.log('Error de conexion con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexion con la base de datos' });
        } 
        const perrito = { perritoId: result.insertId, ...req.body }
        res.status(201).json({msg: 'el perrito fue agregado exitosamente',  perrito});
    });
};


module.exports = {
    buscarTodos,
    buscarPorId,
    agregarPerrito,
}