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

// Ruta para obtener todos los usuarios
app.get('/usuarios', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    conexion.query(query, (error, resultados) => {
        if (error) {
            return res.status(500).json({ message: 'Error al obtener usuarios' });
        }
        res.json(resultados);
    });
});

// Ruta para registrar un nuevo usuario
app.post('/usuarios', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuarios (email, password) VALUES (?, ?)';
    conexion.query(query, [email, hashedPassword], (error, resultados) => {
        if (error) {
            console.error('Error al registrar usuario:', error.message);
            return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
        }        
        res.status(201).json({ message: 'Usuario creado correctamente', id: resultados.insertId, email });
    });
});

// Ruta de login (nueva)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    conexion.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error al buscar el usuario' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const usuario = results[0];

        // Comparar las contraseñas
        bcrypt.compare(password, usuario.password, (err, match) => {
            if (err) {
                return res.status(500).json({ message: 'Error al comparar contraseñas' });
            }

            if (!match) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }

            // Si todo es correcto, devolver una respuesta exitosa
            res.status(200).json({ message: 'Login exitoso', usuario });
        });
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

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
