/*
const mysql = require('mysql2');
require('dotenv').config(); // Carga las variables de entorno desde .env

console.log('DB_HOST:', process.env.DB_HOST); // Debe imprimir 'localhost'
console.log('DB_USER:', process.env.DB_USER); // Debe imprimir 'root'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Debe imprimir 'foxy123'
console.log('DB_NAME:', process.env.DB_NAME); // Debe imprimir 'servi'
console.log('DB_PORT:', process.env.DB_PORT); // Debe imprimir '33065'


const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

conexion.connect((error) => {
  if (error) {
    console.error('❌ Error al conectar a la base de datos:', error);
    return;
  }
  console.log('✅ Conexión a la base de datos establecida');
});

module.exports = conexion;
*/

// MI BD LOCAL (XAMPP)
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




/*LA DE RAILWAY

const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: 'maglev.proxy.rlwy.net',      
    user: 'root',       
    password: 'udIJvtsosxyetdXWXCZuHNrGWZwmVxME', //la contraseña de railway
    database: 'railway',
    port: 46637,
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

module.exports = conexion;
*/