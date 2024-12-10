const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'localhost',      
    user: 'root',       
    password: 'foxy123', 
    database: 'servi',
    port: 33065,
});

//Manejo de errores
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = conexion;
