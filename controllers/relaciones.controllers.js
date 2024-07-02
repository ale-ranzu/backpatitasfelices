const bd = require('../db/db');

 //! El adoptante con el perrito se asocia automaticamente cuado se ingresa un valor desde el formulario del index

/* const asociarAdoptantePerrito = (req, res) => {
    const { adoptante_id, perrito_id } = req.body;

    // Verifica que adoptante_id y perrito_id no sean null o undefined
    if (!adoptante_id || !perrito_id) {
        return res.status(400).json({ error: 'Los IDs de adoptante y perrito son requeridos' });
    }

    const sql = 'INSERT INTO adoptantes_perritos (adoptante_id, perrito_id) VALUES (?, ?)';
    const values = [adoptante_id, perrito_id];

    bd.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al intentar asociar adoptante y perrito:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ msg: 'Se asoció correctamente el adoptante y el perrito' });
    });
}; */

//!Este controlador se usa en menu postulaciones
const solicitarPostulaciones = (req, res) => {
    const sqlPostulaciones = 'SELECT a.nombre_apellido, a.telefono, a.email, a.vivienda, p.nombre as nombre_perrito, p.id as id_perrito FROM adoptantes_perritos ap INNER JOIN perritos p ON ap.id_perrito = p.id INNER JOIN adoptantes a ON ap.id_adoptante = a.id';
    bd.query(sqlPostulaciones, (err, result) => {
        if (err) {
            console.error('Error al obtener las postulaciones de adopcion', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve todas las postulaciones
    });
};

const obtenerPerritosPorAdoptante = (req, res) => {
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
};

const obtenerAdoptantesPorPerrito = (req, res) => {
    const { id } = req.params; // Obtener el ID del perrito desde los parámetros de la URL

    // Consulta SQL para obtener los adoptantes asociados al perrito
    const sql = 'SELECT a.nombre_apellido, a.telefono, a.email, a.vivienda, p.nombre as nombre_perrito, p.id as id_perrito FROM adoptantes_perritos ap INNER JOIN perritos p ON ap.id_perrito = p.id INNER JOIN adoptantes a ON ap.id_adoptante = a.id WHERE id_perrito = ?';

    bd.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al obtener los adoptantes por perrito:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(result); // Devuelve los adoptantes asociados al perrito
    });
};


module.exports = {
    /* asociarAdoptantePerrito, */
    obtenerPerritosPorAdoptante,
    obtenerAdoptantesPorPerrito, //!Esta en uso
    solicitarPostulaciones //!Esta en uso
};
