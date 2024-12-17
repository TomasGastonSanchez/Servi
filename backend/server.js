const express = require('express'); 
const cors = require('cors');
const bcrypt = require('bcrypt');
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

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    const query = 'SELECT * FROM Usuarios WHERE usuario = ?';
    conexion.query(query, [usuario], async (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error en la base de datos' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const user = resultados[0];
        const match = await bcrypt.compare(contrasena, user.contrasena);
        if (!match) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
});

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener clientes' });
        }
        res.json(resultados);
    });
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    const query = 'INSERT INTO clientes (nombre, apellido, telefono, domicilio, cp) VALUES (?, ?, ?, ?, ?)';
    
    conexion.query(query, [nuevoCliente.nombre, nuevoCliente.apellido, nuevoCliente.telefono, nuevoCliente.domicilio, nuevoCliente.cp], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar cliente' });
        }
        res.status(201).json({ id: resultados.insertId, ...nuevoCliente });
    });
});

// Nuevas rutas para Productos
app.get('/productos', (req, res) => {
    const query = 'SELECT * FROM productos';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener productos' });
        }
        res.json(resultados);
    });
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    
    conexion.query(query, [nuevoProducto.nombre, nuevoProducto.descripcion, nuevoProducto.precio], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar producto' });
        }
        res.status(201).json({ id: resultados.insertId, ...nuevoProducto });
    });
});

// Nuevas rutas para Ventas
app.get('/ventas', (req, res) => {
    const query = 'SELECT * FROM ventas';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener ventas' });
        }
        res.json(resultados);
    });
});

app.post('/ventas', (req, res) => {
    const nuevaVenta = req.body;
    const query = 'INSERT INTO ventas (fecha, id_cliente, id_producto) VALUES (?, ?, ?)';
    
    conexion.query(query, [nuevaVenta.fecha, nuevaVenta.id_cliente, nuevaVenta.id_producto], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar venta' });
        }
        res.status(201).json({ id: resultados.insertId, ...nuevaVenta });
    });
});

// Nuevas rutas para Detalle de Ventas
app.get('/detalles_ventas', (req, res) => {
    const query = 'SELECT * FROM detalle_ventas';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener detalles de ventas' });
        }
        res.json(resultados);
    });
});

app.post('/detalles_ventas', (req, res) => {
    const { id_venta, id_producto, cantidad, precio } = req.body;

    if (!id_venta || !id_producto || !cantidad || !precio) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const queryInsert = 'INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)';
    conexion.query(queryInsert, [id_venta, id_producto, cantidad, precio], (error, resultados) => {
        if (error) {
            return res.status(400).json({ message: 'Error al agregar detalle de venta' });
        }

        const id_detalle_venta = resultados.insertId;
        const querySelect = 'SELECT * FROM detalle_ventas WHERE id_detalle_venta = ?';
        conexion.query(querySelect, [id_detalle_venta], (error, filas) => {
            if (error) {
                return res.status(500).json({ message: 'Error al obtener el detalle de venta insertado' });
            }
            res.status(201).json(filas[0]);
        });
    });
});

// Nuevas rutas para Usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM Usuarios';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener usuarios' });
        }
        res.json(resultados);
    });
});

app.post('/usuarios', async (req, res) => {
    const nuevoUsuario = req.body;

    try {
        if (!nuevoUsuario.email || !nuevoUsuario.contrasena || !nuevoUsuario.nombre) {
            return res.status(400).json({ message: 'Faltan campos requeridos' });
        }

        const hashedPassword = await bcrypt.hash(nuevoUsuario.contrasena, 10);
        const query = 'INSERT INTO Usuarios (email, contrasena, nombre) VALUES (?, ?, ?)';

        conexion.query(query, [nuevoUsuario.email, hashedPassword, nuevoUsuario.nombre], (error, resultados) => {
            if (error) {
                console.error("Error en la consulta:", error);
                return res.status(400).json({ message: 'Error al agregar usuario' });
            }
            res.status(201).json({ id_usuario: resultados.insertId, email: nuevoUsuario.email });
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
