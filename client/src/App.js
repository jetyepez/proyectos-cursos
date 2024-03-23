import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect /* y demás imports... */ } from "react";

// Más código...

function App() {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState(0);
  const [Pais, setPais] = useState("");
  const [cargo, setcargo] = useState("");
  const [Anio, setAnio] = useState(0);
  const [id, setid] = useState(0);
  const [editar, seteditar] = useState(false);
  const [EmpleadosList, setEmpleados] = useState([]);

  const add = async () => {
    try {
      // Hacer una solicitud POST con Axios a la URL especificada
      // Los datos del empleado se envían en el cuerpo de la solicitud.
      const response = await Axios.post("http://localhost:3001/create", {
        Nombre: Nombre,
        Edad: Edad,
        Pais: Pais,
        cargo: cargo,
        Anio: Anio,
      });

      // Imprimir la respuesta del servidor en la consola.
      console.log("Respuesta de registro", response);

      // Llamar a la función getEmpleados para obtener la lista actualizada de empleados.
      await getEmpleados();

      // Limpiar los campos de entrada.
      clean();
    } catch (error) {
      // Si hay algún error con la solicitud, se captura en el bloque catch
      // Imprimir el detalle error en la consola.
      console.error("Error al registrar el usuario", error.response);
    }
  };
  const update = () => {
    // Haces una solicitud HTTP PUT al endpoint "update" en tu servidor.
    // Los detalles del empleado que deseas actualizar son enviados en el cuerpo de la solicitud.
    Axios.put("http://localhost:3001/update", {
      id: id,
      Nombre: Nombre,
      Edad: Edad,
      Pais: Pais,
      cargo: cargo,
      Anio: Anio,
    })
      // Una vez que la solicitud PUT ha terminado, .then() maneja la respuesta.
      .then(() => {
        // Llamas a la función getEmpleados para actualizar la lista de empleados en tu aplicación.
        getEmpleados();

        // Y luego, la función clean borra los valores de los campos de formulario
        clean();
      })
      // Si hay un error en cualquiera de los pasos anteriores,
      // la promesa es rechazada y el error puede ser manejado por un bloque .catch().
      .catch((error) =>
        console.error("Hubo un error al actualizar el empleado", error)
      );
  };

  const clean = async () => {
    setAnio("");
    setNombre("");
    setcargo("");
    setEdad("");
    setPais("");
    setid("");
    seteditar(false);
  };
  const editarempleado = (val) => {
    seteditar(true);
    setNombre(val.Nombre);
    setEdad(val.Edad);
    setcargo(val.cargo);
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
  useEffect(() => {
    getEmpleados();
  }, []);

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
              Cargo:
            </span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setcargo(event.target.value);
              }}
              className="form-control"
              placeholder="ingrese un cargo"
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
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={clean}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {EmpleadosList.map((val) => {
            return (
              <tr key={val.id}>
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
                  </div>
                </td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
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
