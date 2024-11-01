const express = require('express'); 
const cors = require('cors');
const conexion = require('./db'); // Importar la conexión

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes'; // Ajusta esto según el nombre de tu tabla
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener clientes' });
        }
        res.json(resultados);
    });
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body; // Obtener el cliente del cuerpo de la solicitud
    const query = 'INSERT INTO clientes (nombre, apellido, telefono, domicilio, cp) VALUES (?, ?, ?, ?, ?)';
    
    conexion.query(query, [nuevoCliente.nombre, nuevoCliente.apellido, nuevoCliente.telefono, nuevoCliente.domicilio, nuevoCliente.cp], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar cliente' });
        }
        // En caso de éxito, puedes responder con el cliente agregado, aunque no tendrás el ID asignado automáticamente
        res.status(201).json({ id: resultados.insertId, ...nuevoCliente });
    });
});

// Nuevas rutas para Productos

// Ruta para obtener todos los productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos'; // Asegúrate de que este nombre de tabla sea correcto
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener productos' });
        }
        res.json(resultados);
    });
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body; // Obtener el producto del cuerpo de la solicitud
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    
    conexion.query(query, [nuevoProducto.nombre, nuevoProducto.descripcion, nuevoProducto.precio], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar producto' });
        }
        // En caso de éxito, responde con el producto agregado
        res.status(201).json({ id: resultados.insertId, ...nuevoProducto });
    });
});

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
