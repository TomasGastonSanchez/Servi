// db.js
const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',        // Cambia esto si tu base de datos está en otro host
    user: 'root',       // Reemplaza con tu nombre de usuario
    password: 'foxy123', // Reemplaza con tu contraseña
    database: 'servi', // Reemplaza con el nombre de tu base de datos
    port: 33065,
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = conexion;
