const express = require("express");
const empleadoRouter = express.Router();

// Declaramos un objeto nuevo
let Empleado = require("../models/Empleado");

// Agregar un nuevo empleado
empleadoRouter.route("/agregar").post((req, res) => {
  Empleado.create(req.body)
    .then((data) => {
      console.log("Se agrego un empleado correctamente");
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Obtenemos todos los empleados
empleadoRouter.route("/empleados").get((req, res) => {
  Empleado.find()
    .then((data) => {
      // console.log('Se obtuvieron los registros');
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Obtenemos un empleado por su ID
empleadoRouter.route("/empleado/:id").get((req, res) => {
  Empleado.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Actualizamos un empleado por su ID
empleadoRouter.route("/actualizar/:id").put((req, res) => {
  Empleado.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((data) => {
      console.log("el empleado se actualizo  correctamente");
      res.send(data);
    })
    .catch((error) => {
      console.log("Existe un error en:" + error);
    });
});

// Eliminamos un empleado por su ID
empleadoRouter.route("/eliminar/:id").delete((req, res) => {
  Empleado.findByIdAndDelete(req.params.id)
    .then((data) => {
      console.log("El empleado se elimino correctamente");
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Exportamos el router
module.exports = empleadoRouter;
