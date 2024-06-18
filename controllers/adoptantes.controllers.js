
//El objeto db posee los métodos para conectar con la base de datos. Es la conexión a la base de datos.

const bd = require('../db/db');

const buscarTodosA = (req, res) => {
    const sql = 'SELECT * FROM adoptantes'
    
    bd.query(sql, (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        } 
        res.json(result);
    });
};

const buscarPorIdA = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM adoptantes WHERE id = ?'
    
    bd.query(sql, [id], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' });
        } 
        if(result.length === 0) {
            console.log('Recurso no encontrado');
            return res.status(404).json({msg:" El recurso solicitado no se encuentra en la base de datos"});
        }
        res.json(result[0]);
    });
};

const buscarPorIdPerrito = (req, res) => {
    const { ID_perrito } = req.params;
    const sql = 'SELECT * FROM `adoptantes` INNER JOIN perritos ON perritos.id = adoptantes.ID_perrito'
    
    bd.query(sql, [id], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' });
        } 
        if(result.length === 0) {
            console.log('Recurso no encontrado');
            return res.status(404).json({msg:" El recurso solicitado no se encuentra en la base de datos"});
        }
        res.json(result[0]);
    });
};

const agregarAdoptante = (req, res) => {
    const { nombre_apellido, telefono, email, dni, vivienda, ID_perrito } = req.body;

    const sql = 'INSERT INTO adoptantes (nombre_apellido, telefono, email, dni, vivienda, ID_perrito) VALUES (?, ?, ?, ?, ?)'
    
    bd.query(sql, [nombre_apellido, telefono, email, dni, vivienda, ID_perrito], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' });
        } 
        const perrito = { perritoId: result.insertId, ...req.body }
        res.status(201).json({msg: 'La persona postulada para adoptar fue agregada exitosamente',  perrito});
    });
};


module.exports = {
    buscarTodosA,
    buscarPorIdA,
    buscarPorIdPerrito,
    agregarAdoptante,
}