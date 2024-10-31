const express = require('express'); 
const cors = require('cors');

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando');
});

// Simulando datos de clientes
const clientes = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', telefono: '123456789', domicilio: 'Calle 1', cp: '1000' },
    { id: 2, nombre: 'Ana', apellido: 'García', telefono: '987654321', domicilio: 'Calle 2', cp: '2000' },
];

// Ruta para obtener todos los clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body; // Obtener el cliente del cuerpo de la solicitud
    // Asegúrate de que el nuevo cliente tenga un id único
    nuevoCliente.id = clientes.length + 1; // Generar un nuevo ID
    clientes.push(nuevoCliente); // Agregar el nuevo cliente al array
    res.status(201).json(nuevoCliente); // Responder con el nuevo cliente creado
});

const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
