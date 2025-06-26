const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// conectamos a la base de datos
mongoose
  // .connect("mongodb://localhost:27017/empleados")
  .connect(
    // despues del .net/ va el nombre de la base de datos
    // en este caso es empleados
    "mongodb+srv://abrilscti22:II03A0Srstj7VTuu@cluster0.nhxmp2h.mongodb.net/empleados?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((conn) => {
    console.log(`Conectado a la base de datos: "${conn.connection.name}"`);
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
  });

//configuarar el servidor web
const empleadoRutas = require("./routes/empleado.routes");
const { create } = require("./models/Empleado");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
// app.use(cors({
//   origin: 'https://empleados-front-end.vercel.app'
// }));

app.use("/api", empleadoRutas);
// Puerto de escucha _ habilitamos el puerto 4000
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

// Manejo de errores 404
app.use((err, req, res, next) => {
  next(createError(404));
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message || "Error interno del servidor");
});

