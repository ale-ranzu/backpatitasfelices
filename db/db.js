//importo el modulo mysql2

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // Usuario de MySQL (por defecto 'root' en Laragon)
  password: process.env.DB_PASS, // Contraseña de MySQL (por defecto vacía en Laragon)
  database: process.env.DB_NAME, // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.log("Error durante la conexión a la base de datos", error);
    return;
  }
  console.log("Conexion establecida con la base de datos");
});

module.exports =
  connection; /* Esto se usa en los controladores para establecer la conexion con la base de datos */
