const bd = require('../db/db');

const buscarTodosAdoptantes = (req, res) => {
    const sql = 'SELECT * FROM adoptantes'
    
    bd.query(sql, (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        } 
        res.json(result);
    });
};

const buscarPorIdAdoptantes = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM adoptantes WHERE id = ?'
    
    bd.query(sql, [id], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' });
        } 
        if(result.length === 0) {
            console.log('No podemos encontrar la persona adoptante');
            return res.status(404).json({msg:" La persona no se encuentra en la base de datos"});
        }
        res.json(result[0]);
    });
};


const agregarAdoptante = (req, res) => {
    const { nombre_apellido, telefono, email, dni, vivienda, ID_perrito } = req.body;
    console.log('Datos recibidos:', req.body);
    const sql = 'INSERT INTO adoptantes (nombre_apellido, telefono, email, dni, vivienda, ID_perrito) VALUES (?, ?, ?, ?, ?, ?)';
    
    bd.query(sql, [nombre_apellido, telefono, email, dni, vivienda, ID_perrito], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' });
        } 
        const nuevoAdoptante = { adoptanteId: result.insertId, ...req.body }
        res.status(201).json({msg: 'La persona postulada para adoptar fue agregada exitosamente',  nuevoAdoptante});
    });
};


const borrarPorId = (req, res) => {
    const  { id } = req.params;
    const sqlBuscarId = 'SELECT * FROM perritos WHERE id = ?';
    const sqlBorrar = 'DELETE FROM perritos WHERE id = ?';

    bd.query(sqlBuscarId, [id], (err, result) => {
        if(err) {
            console.error('Error al intentar borrar el recurso', err);
            return res.status(500).json({ error: 'Error interno del servidor. Intente más tarde' });
        };
        if (result.length === 0) {
            console.error('Recurso no encontrado');
            return res.status(404).json({ error: 'Recurso no encontrado' });
        };
        bd.query(sqlBorrar, [id], (err, result) => {
            res.json({ msg: 'El recurso fue eliminado exitosamente' });
        });
    });
};

///////////////////////////////////

const borrarPorIdAdoptante = (req, res) => {
    const  { id } = req.params;
    const sqlBuscarIdAdoptante = 'SELECT * FROM adoptantes WHERE id = ?';
    const sqlBorrarAdoptante = 'DELETE FROM adoptantes WHERE id = ?';

    bd.query(sqlBuscarIdAdoptante, [id], (err, result) => {
        if(err) {
            console.error('Error al intentar borrar la persona adoptante', err);
            return res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde.' });
        };
        if (result.length === 0) {
            console.error('Persona no encontrado');
            return res.status(404).json({ error: 'No encontramos a la persona adoptante.' });
        };
        bd.query(sqlBorrarAdoptante, [id], (err, result) => {
            res.json({ msg: 'Se eliminó correctamente a la persona adoptante' });
        });
    });
};

const actualizarAdoptante = (req, res) => {
    const { id } = req.params; 
    const { nombre_apellido, telefono, email, dni, vivienda, ID_perrito } = req.body;

    const sqlBuscarPorIdAdoptante = 'SELECT * FROM adoptantes WHERE id = ?';
    const sqlModificarAdoptante = 'UPDATE adoptantes SET nombre_apellido = ?, telefono = ?, email = ?, dni = ?, vivienda = ?, ID_perrito = ? WHERE id = ?';
    
    bd.query(sqlBuscarPorIdAdoptante, [id], (err, result) => {
        if(err) {
            console.error('Error al buscar a la persona adoptante en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor. Intenta más tarde' });
        };
        if(result.length === 0) {
            console.error('No podemos encontrar la persona adoptante');
            return res.status(404).json({ error: 'No podemos encontrar la persona adoptante' });
        }
        const adoptanteOld = result[0];

        //Creo el array de nuevos valores       
        const valores = [
            id,
            nombre_apellido ?? adoptanteOld.nombre_apellido,
            telefono ?? adoptanteOld.telefono,
            email ?? adoptanteOld.email,
            dni ?? adoptanteOld.dni,
            vivienda ?? adoptanteOld.vivienda,
            ID_perrito ?? adoptanteOld.ID_perrito
            
        ];

        //Actualizacion:
        bd.query(sqlModificarAdoptante, valores, (err, result) => {
            if(err) {
                console.error('Error al intentar actualizar la persona:', err);
                return res.status(500).json({ error: 'Error interno del servidor. Intente más tarde' });
            };
            const adoptanteActual = { 
                id: adoptanteOld.id,
                nombre_apellido: nombre_apellido ?? adoptanteOld.nombre_apellido,
                telefono: telefono ?? adoptanteOld.telefono,
                email: email ?? adoptanteOld.email,
                dni: dni ?? adoptanteOld.dni,
                vivienda: vivienda ?? adoptanteOld.vivienda,
                ID_perrito: ID_perrito ?? adoptanteOld.ID_perrito,
            };

            res.json({ msg: 'Se actualizaron los datos de la persona adoptante', adoptanteActual });
        });
    });
};



module.exports = {
    buscarTodosAdoptantes,
    buscarPorIdAdoptantes,
    agregarAdoptante,
    actualizarAdoptante,
    borrarPorIdAdoptante,
}