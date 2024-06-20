//Conexión a la base de datos

const bd = require("../db/db");

const buscarTodos = (req, res) => {
  const sql = "SELECT * FROM historialdonaciones";

  bd.query(sql, (err, result) => {
    if (err) {
      console.log("Error de conexión a la Base de datos");
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(result);
  });
};

const ordenarMayor = (req, res) => {
  const sql = "SELECT * FROM historialdonaciones ORDER BY montoDonacion DESC";

  bd.query(sql, (err, result) => {
    if (err) {
      console.log("Error de conexión a la Base de datos");
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(result);
  });
};

module.exports = {
  buscarTodos,
  ordenarMayor,
};
