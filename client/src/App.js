import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Pais, setPais] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Anio, setAnio] = useState(0);
  const [id, setid] = useState(0);
  const [editar, seteditar] = useState(false);
  const [EmpleadosList, setEmpleados] = useState([]);

  const add = async () => {
    Axios.post("http://localhost:3001/create", {
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      cargo: Cargo,
      Anio: Anio,
    })
      .then(() => {
        getEmpleados();
        alert("Empleado Registrado");
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
  const editarempleado = (val) => {
    seteditar(true);
    setNombre(val.Nombre);
    setEdad(val.Edad);
    setCargo(val.Cargo);
    setPais(val.Pais);
    setAnio(val.Anio);
    setid(val.id);
  };
  let cont = 0;
  const getEmpleados = async () => {
    if (cont < 1) {
      Axios.get("http://localhost:3001/empleados").then((response) => {
        setEmpleados(response.data);
      });
      cont++;
    }
  };
  getEmpleados();

  return (
    <div className="container">
      <div className="caNamerd text-center">
        <div className="card-header">Gestión de Empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={Nombre}
              placeholder="ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              value={Edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="ingrese una edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              type="text"
              value={Pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="ingrese un Pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              cargo:
            </span>
            <input
              type="text"
              value={Cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="ingrese un Cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              value={Anio}
              onChange={(event) => {
                setAnio(event.target.value);
              }}
              className="form-control"
              placeholder="ingrese los años"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          <button className="btn btn-success" onClick={add}>
            Registrar
          </button>
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {EmpleadosList.map((val, key) => {
            return (
              <tr>
                <th scope="row">{val.id}</th>
                <td>{val.Nombre}</td>
                <td>{val.Edad}</td>
                <td>{val.Pais}</td>
                <td>{val.Cargo}</td>
                <td>{val.Anio}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarempleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button type="button" className="btn btn-danger">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
