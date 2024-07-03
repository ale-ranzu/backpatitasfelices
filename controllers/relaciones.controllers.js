const bd = require('../db/db');

// De la tabla postulantes para un perrito se selecciona un postulante y genera la adopcion.
const agregarAdopcion = (req, res) => {
    const { id_perrito, id_adoptante } = req.body;

    // Verifica que adoptante_id y perrito_id no sean null o undefined
    if (!id_adoptante || !id_perrito) {
        return res.status(400).json({ error: 'Los IDs de adoptante y perrito son requeridos' });
    }

    const sql = 'INSERT INTO adopciones (id_perrito, id_adoptante, fecha_adopcion) VALUES (?, ?, ?)';
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const dia = fechaActual.getDate();
    const fecha_adopcion = `${año}-${mes}-${dia}`;

    const values = [id_perrito, id_adoptante, fecha_adopcion];

    bd.query(sql, values, (err, result ) => {
        if (err) {
            console.error('Error al ingresar adopcion:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ msg: 'Se asoció correctamente el adoptante y el perrito'});
    });
}; 

//Se renderizan las adopciones en Adopciones
const solicitarAdopciones = (req, res) => {
    const sqlPostulaciones = 'SELECT a.id, a.nombre_apellido, a.telefono, a.email, p.nombre as nombre_perrito, p.id as id_perrito, ad.fecha_adopcion FROM adopciones ad INNER JOIN perritos p ON ad.id_perrito = p.id INNER JOIN adoptantes a ON ad.id_adoptante = a.id';
    bd.query(sqlPostulaciones, (err, result) => {
        if (err) {
            console.error('Error al obtener las adopciones', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve todas las adopciones
    });
};

//Se renderizan las postulaciones en Postulaciones
const solicitarPostulaciones = (req, res) => {
    const sqlPostulaciones = 'SELECT a.id, a.nombre_apellido, a.telefono, a.email, a.vivienda, p.nombre as nombre_perrito, p.id as id_perrito FROM adoptantes_perritos ap INNER JOIN perritos p ON ap.id_perrito = p.id INNER JOIN adoptantes a ON ap.id_adoptante = a.id';
    bd.query(sqlPostulaciones, (err, result) => {
        if (err) {
            console.error('Error al obtener las postulaciones de adopcion', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve todas las postulaciones
    });
};

//!Al generarse la adopcion eliminamos las postulaciones generadas para ese perrito, por otra parte se debe cambiar el estado_adopcion del perrito a "adoptado"
const eliminarPostulaciones = (req, res) => {
    const  { id_perrito } = req.params;
    const sqlBorrar = 'DELETE FROM adoptantes_perritos WHERE id_perrito = ?';

    bd.query(sqlBorrar, [id_perrito], (err, result) => {
        if(err) {
            console.error('Error al intentar borrar el recurso', err);
            return res.status(500).json({ error: 'Error interno del servidor. Intente más tarde' });
        };
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'No se encontraron postulaciones para el id_perrito especificado' });
        }
        res.status(200).json({ msg: 'El recurso fue eliminado exitosamente' });
    });
};

//!*SIN USO --->
/* const obtenerPerritosPorAdoptante = (req, res) => {
    const { id } = req.params; // Obtener el ID del adoptante desde los parámetros de la URL

    // Consulta SQL para obtener los perritos asociados al adoptante
    const sql = 'SELECT p.* FROM perritos p JOIN adoptantes_perritos ap ON p.id = ap.perrito_id WHERE ap.adoptante_id = ?';

    bd.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener los perritos por adoptante:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve los perritos asociados al adoptante
    });
}; */

//Se obtienen los postulantes para un perrito donde esta habilitado el boton Postulantes.
const obtenerAdoptantesPorPerrito = (req, res) => {
    const { id } = req.params; // Obtener el ID del perrito desde los parámetros de la URL

    // Consulta SQL para obtener los adoptantes asociados al perrito
    const sql = 'SELECT a.id, a.nombre_apellido, a.telefono, a.email, a.vivienda, p.nombre as nombre_perrito, p.id as id_perrito FROM adoptantes_perritos ap INNER JOIN perritos p ON ap.id_perrito = p.id INNER JOIN adoptantes a ON ap.id_adoptante = a.id WHERE id_perrito = ?';

    bd.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener los adoptantes por perrito:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve los postulantes asociados al perrito
    });
};

module.exports = {
    solicitarPostulaciones,
    eliminarPostulaciones,
    agregarAdopcion,
    solicitarAdopciones,
    obtenerAdoptantesPorPerrito, //!Esta en uso, se obtienen todos los postulantes para un perrito
    solicitarPostulaciones, //!Esta en uso
    /* obtenerPerritosPorAdoptante, */ // En el marco de la tabla adopciones deberia devolver todos los perritos para un adoptante NO IMPLEMENTADO
};
