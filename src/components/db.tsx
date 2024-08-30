const sql_server = require('mssql');

// Configuración de la conexión
const config = {
  user: 'sa',          // El usuario que usas para conectarte a SQL Server
  password: 'foxy123',   // La contraseña para el usuario
  server: 'localhost',         // El servidor de SQL Server (si es local, usa 'localhost')
  database: 'Servi',// El nombre de tu base de datos
  options: {
    encrypt: false,            // Usa true si estás usando Azure SQL, o false para local
    trustServerCertificate: false // Usa true si estás conectando a un servidor con un certificado autofirmado
  }
};

// Conectarse a la base de datos
async function conectarDatabase() {
  try {
    await sql_server.connect(config);
    console.log('Conexión exitosa a la base de datos');
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
  }
}

module.exports = {
  sql_server,
  conectarDatabase
};
