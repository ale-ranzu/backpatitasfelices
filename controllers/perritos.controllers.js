
//El objeto db posee los métodos para conectar con la base de datos. Es la conexión a la base de datos.

const bd = require('../db/db');

const path = require('path'); 

const fs = require('fs');

const buscarTodos = (req, res) => {
    const sql = 'SELECT * FROM perritos';
    
    bd.query(sql, (err, result) => {
        if(err) {
            console.error('Error al buscar todos los perritos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor, intente más tarde.' });
        }; 
        res.json(result);
    });
};

const buscarLibreEnProceso = (req, res) => {
    const sql = 'SELECT * FROM perritos WHERE estado_adopcion IN ("libre", "en proceso")';
    bd.query(sql, (err, result) => {
        if(err) {
            console.error('Error al buscar todos los perritos en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor, intente más tarde.' });
        }; 
        res.json(result);
    });
};


const buscarPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM perritos WHERE id = ?';
    
    bd.query(sql, [id], (err, result) => {
        if(err) {
            console.error('Error al buscar el perrito en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor, intente más tarde' });
        }; 
        if(result.length === 0) {
            console.error('Recurso no encontrado');
            return res.status(404).json({ error: "Recurso no encontrado" });
        }
        res.json(result[0]); /* Para que devuelva el objeto y no un array de 1 objeto */ 
    });
};

const agregarPerrito = (req, res) => {
    const { nombre, genero, edad, condicion_medica, tamano, estado_adopcion } = req.body;
    console.log('Datos recibidos:', req.body); // Agrega esta línea para depuración
    const sql = 'INSERT INTO perritos (nombre, genero, edad, condicion_medica, tamano, estado_adopcion,  url_img, fecha_ingreso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    /*
    si public es la raíz de tus archivos estáticos y tienes una imagen guardada en public/img_perritos/perro.jpg, la URL accesible para esa imagen sería /img_perritos/perro.jpg.

    Incluir la parte public en la URL puede exponer detalles sobre la estructura interna del sistema de archivos del servidor, lo cual no es necesario y podría ser considerado una mala práctica de seguridad.

    El valor req.file es creado por multer cuando un archivo es subido a través de un formulario. 

    ¿Cómo se Crea req.file?
    Formulario HTML: Cuando un usuario envía un formulario que contiene un archivo, el navegador envía una solicitud HTTP POST con el archivo adjunto. <form action="/agregar-perrito" method="POST" enctype="multipart/form-data">
    Middleware de Multer: Cuando la solicitud llega al servidor, el middleware de multer intercepta la solicitud.

    Procesamiento del Archivo: multer procesa el archivo, lo guarda en la ubicación especificada (en este caso, public/img_perritos/), y agrega un objeto file a la solicitud (req.file), que contiene información sobre el archivo subido, incluyendo su nombre, ruta, tipo MIME, etc.

    Disponibilidad en req.file: Después de que multer ha procesado el archivo, req.file está disponible en el controlador que maneja la ruta, en este caso, agregarPerrito.
    req.file.path es específico de multer y representa la ubicación temporal del archivo en el servidor antes de ser movido o procesado de alguna manera.

    */
    const url_img = req.file.path.replace('public', '');
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    const dia = fechaActual.getDate();
    const fecha_ingreso = `${año}-${mes}-${dia}`;
    bd.query(sql, [nombre, genero, edad, condicion_medica, tamano, estado_adopcion, url_img, fecha_ingreso ], (err, result) => {
        if(err) {
            console.error('Error al intentar agregar un nuevo perrito:', err);
            return res.status(500).json({ error: 'Error interno del servidor, intente más tarde' });
        } 
        const nuevoPerrito = { perritoId: result.insertId, ...req.body, url_img };
        res.status(201).json({ msg: 'el perrito fue agregado exitosamente',  nuevoPerrito });
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
        const perritoABorrar = result[0];
        bd.query(sqlBorrar, [id], (err, result) => {
            res.status(200).json({ msg: 'El recurso fue eliminado exitosamente' });
        });

        const imgABorrarRuta = perritoABorrar.url_img.replace(/\\/g, '/');
        const imgABorrar = path.join(__dirname, '..', 'public', imgABorrarRuta);
        fs.unlink(imgABorrar, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen:', err);
            } else {
                console.log('Imagen eliminada:', imgABorrar);
            };
        });
    });
};

const actualizar = (req, res) => {
    const { id } = req.params; 
    const url_img = req.file ? req.file.path.replace('public', '') : null;
    const { nombre, genero, edad, condicion_medica, tamano, estado_adopcion } = req.body;

    const sqlBuscarPorId = 'SELECT * FROM perritos WHERE id = ?';
    const sqlModificar = 'UPDATE perritos SET nombre = ?, genero = ?, edad = ?, condicion_medica= ?, tamano = ?, estado_adopcion = ?, url_img = ? WHERE id = ?';

    //Busco el perrito y obtengo su valor anterior
    bd.query(sqlBuscarPorId, [id], (err, result) => {
        if(err) {
            console.error('Error al buscar el perrito en la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor. Intente mas tarde' });
        };
        if(result.length === 0) {
            console.error('Recurso no encontrado');
            return res.status(404).json({ error: 'Recurso no encontrado' });
        }
        const perritoAnterior = result[0];

        //Creo el array de nuevos valores
        
        const valores = [
            nombre || perritoAnterior.nombre,
            genero || perritoAnterior.genero,
            edad || perritoAnterior.edad,
            condicion_medica || perritoAnterior.condicion_medica,
            tamano || perritoAnterior.tamano,
            estado_adopcion || perritoAnterior.estado_adopcion,
            url_img || perritoAnterior.url_img,
            id
        ];
    
        console.log(valores);

        //Actualizacion:
        bd.query(sqlModificar, valores, (err, result) => {
            if(err) {
                console.error('Error al intentar actualizar el perrito:', err);
                return res.status(500).json({ error: 'Error interno del servidor. Intente más tarde' });
            };
            const perritoActualizado = { 
                id: perritoAnterior.id,
                nombre: nombre || perritoAnterior.nombre,
                genero: genero || perritoAnterior.genero,
                edad: edad || perritoAnterior.edad,
                condicion_medica: condicion_medica || perritoAnterior.condicion_medica,
                tamano: tamano || perritoAnterior.tamano,
                estado_adopcion: estado_adopcion || perritoAnterior.estado_adopcion,
                url_img: url_img || perritoAnterior.url_img,
            };

            res.json({ msg: 'Perrito actualizado con éxito', perritoActualizado });
        });
    });
};

const filtrarEstadoAdopcion = (req, res) => {
    const { estadoAdopcion } = req.params;

    const sql = 'SELECT * FROM perritos WHERE estado_adopcion = ?';
    
    bd.query(sql, [estadoAdopcion], (err, result) => {
        if (err) {
            console.log('Error al filtrar por estado de adopcion', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.json(result);
    });
};


const filtrarPorTamaño = (req, res) => {
    let { tamano } = req.params;

    if(tamano === 'pequeno') {
        tamano = 'pequeño';
    }

    const sql = 'SELECT * FROM perritos WHERE tamano = ?';
    
    bd.query(sql, [tamano], (err, result) => {
        if (err) {
            console.log('Error al filtrar por tamaño', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.json(result);
    });

};

//!Este controlador se utiliza en el sitio si un perrito quiere ser adoptado
const cambiarEstadoAdopcion = (req, res) => {
    const { id } = req.params;
    const { estado_adopcion } = req.body;
    console.log(estado_adopcion)

    sql = 'UPDATE perritos SET estado_adopcion = ? WHERE id = ?';

    bd.query(sql, [estado_adopcion, id], (err, result) => {
        if (err) {
            console.log('Error al cambiar estado de adopcion', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.status(201).json({ msg: `Se modifico el estado de adopcion del perrito a ${estado_adopcion}` });
    });
};

/* const cambiarEstadoAdopcionAdoptado = (req, res) => {
    const { id } = req.params;
    sql = 'UPDATE perritos set estado_adopcion = ? WHERE id = ?';

    bd.query(sql, ['adoptado', id], (err, result) => {
        if (err) {
            console.log('Error al cambiar estado de adopcion', err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde' });
            return
        } 
        res.status(201).json({ msg: 'Se modifico el estado del perrito a "adoptado"' });
    });
}; */

//Buscar en tabla postulaciones los id de postulantes para un perrito. Controlador para tabla postulaciones.
const obtenerPostulantes = (req, res) => {
    const { idPerrito } = req.params;
    //Buscar en tabla postulaciones los idAdoptantes 
    sql = 'SELECT * FROM postulaciones WHERE id_perritos = 2' //Tiene que devolver todos los posibles adoptantes para un perrito. No devuelve perritos solo id postulantes. Devuelve un array de idspostulantes.

    sql2 = 'SELECT * FROM adoptantes WHERE id = ?';

    bd.query(sql, [idPerrito], (err, result) => {
        if(err) {
            console.log(`Error al buscar postulantes para el perrito ${idPerrito}`, err);
            res.status(500).json({ error: 'Error interno del servidor, intente mas tarde', err });
            return
        }
        if(result.length === 0) {
            res.json(false); //Si no hay postulantes devuelve false, pensar esto...
            return
        }
        const listaIdPostulantes = result; //array de objetos
        let listaPostulantes = [];
            for(let i = 0; i < listaIdPostulantes.length;   ) {

            }
        
    });

}

module.exports = {
    buscarTodos,
    buscarLibreEnProceso,
    buscarPorId,
    agregarPerrito,
    actualizar,
    borrarPorId,
    cambiarEstadoAdopcion,
    filtrarEstadoAdopcion,
    filtrarPorTamaño
}