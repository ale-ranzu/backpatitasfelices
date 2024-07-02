//importo el modulo mysql2

const mysql = require("mysql2");
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, 
  password: process.env.DB_PASS, 
  database: process.env.DB_NAME, 
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
  connection; 
