//Conexión a la base de datos

const bd = require("../db/db");

const buscarTodos = (req, res) => {
  const sql = "SELECT * FROM perritos";

  bd.query(sql, (err, result) => {
    if (err) {
      console.log("Error de conexión con la base de datos");
      return res.status(500).json({ error: "Error interno de servidor" });
    }
    res.json(result);
  });
};

const buscarPorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM historialdonaciones WHERE id = ?";

  bd.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Dato no encontrado");
      return res.status(404).json({
        msg: "El dato solicitado no se encuentra en la base de datos",
      });
    }
    res.json(result[0]);
  });
};

const registrarDonacion = (req, res) => {
  const { nombre, fechaDonacion, montoDonacion } = req.body;

  const sql =
    "INSERT INTO historialdonaciones (nombre, fechaDonacion, montoDonacion) VALUES (?, ?, ?)";

  bd.queri(sql, [nombre, fechaDonacion, montoDonacion], (err, result) => {
    if (err) {
      console.log("Error al insertar donación", err);
      return res.status(500).json({
        msg: "El proceso no se realizó de manera exitosa",
      });
    }
    const donacion = { donacionId: result.insertId, ...req.body };
    res.status(201).json({ msg: "La donación fue registrada correctamente" });
  });
};

module.exports = {
  buscarTodos,
  buscarPorId,
  registrarDonacion,
};
