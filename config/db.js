const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    connectionLimit: 100
});

async function getConnection(){
    let connection;
    try {
        connection = await pool.getConnection();
        return connection;
    } catch (err) {
        console.error("Error al conectarse a la db: ", err);
        throw err;
    }
}

module.exports = {
    pool,
    getConnection
};

