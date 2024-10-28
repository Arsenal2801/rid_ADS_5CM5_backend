const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./src/config/db");

// Middleware para habilitar CORS
app.use(
  cors({
    origin: "http://localhost:3001", // Cambia esto a la URL de tu frontend si es diferente
    methods: ["GET", "POST"], // Métodos permitidos
    credentials: true, // Si necesitas enviar cookies o headers de autenticación
  })
);

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Importar y usar las rutas
const authRoutes = require("./src/routes/auth_router");
const celulasRoutes = require("./src/routes/celulas_router"); // Ruta para las células
const casoRoutes = require("./src/routes/caso_router");

// Rutas de la API
app.use("/api/users/auth", authRoutes);
app.use("/api/celulas", celulasRoutes); // Rutas de las células
app.use("/api/casos", casoRoutes);

// Sincroniza la base de datos (opcional, para crear tablas si no existen)
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
