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

const registrarDonacion = (req, res) => {
  const { nombre, email, fechaDonacion, montoDonacion } = req.body;

  const sql =
    "INSERT INTO historialdonaciones (nombre, email, fechaDonacion, montoDonacion) VALUES (?, ?, ?, ?)";

  bd.query(
    sql,
    [nombre, email, fechaDonacion, montoDonacion],
    (err, result) => {
      if (err) {
        console.log("Error de conexión a la base de datos", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      const donacion = { donacionId: result.insertId, ...req.body };
      res
        .status(201)
        .json({ msg: "Donación registrada satisfactoriamente", donacion });
    }
  );
};

module.exports = {
  buscarTodos,
  ordenarMayor,
  registrarDonacion,
};
