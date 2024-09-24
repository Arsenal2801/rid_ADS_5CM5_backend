const express = require('express');
const { getConnection } = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta de ejemplo para obtener datos
app.get('/example', async (req, res) => {
    let connection;
    try {
        connection = await getConnection();
        const rows = await connection.query('select * from rights');
        res.json(rows);
    } catch (err) {
        console.error('Error al consultar la base de datos: ', err);
        res.status(500).send('Error en el servidor');
    } finally {
        if (connection) connection.end(); // Asegúrate de cerrar la conexión
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

