//importo el modulo mysql2

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:"localhost",
    user:"root", // Usuario de MySQL (por defecto 'root' en Laragon)
    password:"patitasfelices", // Contraseña de MySQL (por defecto vacía en Laragon)
    database:"patitas_felices_bd", // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect(error => {
    if(error) {
        console.log('Error durante la conexión a la base de datos', error);
        return;
    }
    console.log('Conexion establecida con la base de datos');
});

module.exports = connection; /* Esto se usa en los controladores para establecer la conexion con la base de datos */