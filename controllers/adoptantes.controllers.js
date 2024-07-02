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
    const { nombre_apellido, telefono, email, dni, vivienda, ID_perrito } = req.body; //!Recibe ID_perritos
    console.log('Datos recibidos:', req.body);
    const sql = 'INSERT INTO adoptantes (nombre_apellido, telefono, email, dni, vivienda) VALUES (?, ?, ?, ?, ?)'; //! Pero no lo ingresa acá
    const sqlPostulacion = 'INSERT INTO adoptantes_perritos (id_perrito, id_adoptante) VALUES (?, ?);'

    bd.query(sql, [nombre_apellido, telefono, email, dni, vivienda], (err, result) => {
        if(err) {
            console.log('Error de conexión con la base de datos', err);
            return res.status(500).json({ error: 'Error interno del servidor, no se pudo establecer conexión con la base de datos' }); 
        } 
        const adoptanteId = result.insertId;
        const nuevoAdoptante = { adoptanteId, ...req.body } 

        //!Consulta para agregar postulacion
        bd.query(sqlPostulacion, [ID_perrito, adoptanteId], (err, resultPostulacion) => {  //! Ingresamos el ID_perrito en la tabla adoptantes_perritos, donde se registran las postulaciones 
            if(err) {
                console.log('Error al insertar postulante', err);
                return res.status(500);
            };
            res.status(201).json({msg: 'La persona postulada para adoptar fue agregada exitosamente',  nuevoAdoptante});
        });
    });
};

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
    const { nombre_apellido, telefono, email, dni, vivienda } = req.body;
    console.log(req.body); /* No se esta recibiendo nada en el body */

    const sqlBuscarPorIdAdoptante = 'SELECT * FROM adoptantes WHERE id = ?';
    const sqlModificarAdoptante = 'UPDATE adoptantes SET nombre_apellido = ?, telefono = ?, email = ?, dni = ?, vivienda = ? WHERE id = ?';
    
    //!Saco ID_perrito de este controlador
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
            nombre_apellido || adoptanteOld.nombre_apellido,
            telefono || adoptanteOld.telefono,
            email || adoptanteOld.email,
            dni || adoptanteOld.dni,
            vivienda || adoptanteOld.vivienda,
            id
        ];

        //Actualizacion:
        bd.query(sqlModificarAdoptante, valores, (err, result) => {
            if(err) {
                console.error('Error al intentar actualizar la persona:', err);
                return res.status(500).json({ error: 'Error interno del servidor. Intente más tarde' });
            };
            const adoptanteActual = { 
                id: adoptanteOld.id,
                nombre_apellido: nombre_apellido || adoptanteOld.nombre_apellido,
                telefono: telefono || adoptanteOld.telefono,
                email: email || adoptanteOld.email,
                dni: dni || adoptanteOld.dni,
                vivienda: vivienda || adoptanteOld.vivienda,
            };
            console.log(adoptanteActual);

            res.json({ msg: 'Se actualizaron los datos de la persona adoptante', adoptanteActual });
        });
    });
};

const filtrarPorIDperrito  = (req, res) => {
    const { nombre } = req.params;

    const sql = 'SELECT * FROM adoptantes WHERE ID_perrito = ?';
    
    bd.query(sql, [nombre], (err, result) => {
        if (err) {
            console.log('Error al filtrar el ID del perrito', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.json(result);
    });
};

const filtrarPorVivienda  = (req, res) => {
    const { nombre } = req.params;

    const sql = 'SELECT * FROM adoptantes WHERE vivienda = ?';
    
    bd.query(sql, [nombre], (err, result) => {
        if (err) {
            console.log('Error al filtrar la vivienda', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.json(result);
    });
};


module.exports = {
    buscarTodosAdoptantes,
    buscarPorIdAdoptantes,
    agregarAdoptante,
    actualizarAdoptante,
    borrarPorIdAdoptante,
    filtrarPorIDperrito,
    filtrarPorVivienda,
}