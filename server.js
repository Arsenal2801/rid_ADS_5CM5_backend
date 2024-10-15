const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const sequelize = require("./src/config/db"); // Importa la conexión a la base de datos

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Aquí puedes importar y usar las rutas de tus controladores
//const usuarioRoutes = require("./src/routes/usuarios");
//app.use("/api/usuarios", usuarioRoutes);

const authRoutes = require("./src/routes/auth_router");
app.use("/api/users/auth", authRoutes);

// Sincroniza la base de datos (opcional, para crear tablas si no existen)
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
