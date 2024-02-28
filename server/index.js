const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "empleados_crud",
});

app.post("/create", (req, res) => {
  const Nombre = req.body.Nombre;
  const Edad = req.body.Edad;
  const Pais = req.body.Pais;
  const Cargo = req.body.Cargo;
  const Anio = req.body.Anio;

  db.query(
    "INSERT INTO empleados (Nombre, Edad, Pais, Cargo, Anio) VALUES (?, ?, ?, ?, ?)",
    [Nombre, parseInt(Edad), Pais, Cargo, parseInt(Anio)],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar el empleado");
      } else {
        res.send("Empleado registrado con éxito");
      }
    }
  );
});

app.get("/empleados", (req, res) => {
  db.query(
    "SELECT * FROM empleados",
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error al registrar el empleado prueba");
      } else {
          res.send(result);
      
      }
    }
  );
});

app.put("/update", (req, res) => {
  const  id= req.body.id;
  const Nombre = req.body.Nombre;
  const Edad = req.body.Edad;
  const Pais = req.body.Pais;
  const Cargo = req.body.Cargo;
  const Anio = req.body.Anio;

  db.query("UPDATE empleados SET Nombre=?, Edad=?, Pais=?, Cargo=?, Anio=? WHERE id=?",
    [Nombre, parseInt(Edad), Pais, Cargo, parseInt(Anio), id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.listen(3001, () => {
  console.log("Corriendo en el puerto 3001");
});
