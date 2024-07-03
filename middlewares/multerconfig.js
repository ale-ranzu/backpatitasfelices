const multer = require('multer');

const path = require('path');

/*
diskStorage():
Es un método en Multer que se utiliza para configurar cómo y dónde se 
almacenan los archivos subidos. Permite especificar el destino y el nombre de 
los archivos.
*/ 
const storage = multer.diskStorage({
    // destination recibe como parámetro una request, el archivo y un callback.

    destination: (req, file, cb) => {
        /*
        El uso de null como primer parámetro del callback cb es una convención para indicar que no hubo errores durante la operación. Esta es una práctica común en Node.js para manejar asincronía, especialmente en funciones de callback.
        */
        cb(null, 'public/img_perritos/'); 
    },

    /*
    filename es otro método en Multer que se utiliza para configurar el nombre del archivo 
    que estamos recibiendo. Siempre que recibamos un archivo del front, el nombre 
    del archivo habrá que cambiarlo para asegurarnos que sea un nombre único 
    dentro de nuestra storage.
    */
    filename: (req, file, cb) => {
        
        cb(null, Date.now() + path.extname(file.originalname)); // --> path.extname extrae la extension del archivo.
    }

});

const upload = multer({ 
    storage: storage,

    //Funcion para filtrar los archivos segun su tipo
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp/;

        /*
        MIME Type, significa Multipurpose Internet Mail Extensions Type. Indica el tipo de contenido y formato de un archivo.Asegura que los archivos sean reconocidos y manejados correctamente, mejorando la seguridad y compatibilidad.
        */

        //Verifica si el tipo MIME del archivo es uno de los permitidos
        const mimetype = filetypes.test(file.mimetype);

        //Verifica si la extension del archivo es una de las permitidas
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        //Si ambos anteriores son permitidos, acepta el archivo:
        if(mimetype && extname) {
            return cb(null, true);
        };

        cb('Error: tipo de archivo no soportado');
    },

    //Define un limite para el archivo como el tamaño máximo en bits
    limits: { fileSize: 5000000 }
});

module.exports = upload;