// src/api/api.tsx
import axios from 'axios';

// Define la estructura del Cliente
interface Cliente {
    id_cliente: number; // Cambiado de 'id' a 'id_cliente'
    nombre: string;
    apellido: string;
    telefono: number;
    domicilio: string;
    cp: string;
}

// Define la estructura del Producto
interface Producto {
    id_producto: number; // Cambiado de 'id' a 'id_producto'
    nombre: string;
    descripcion: string;
    precio: number; // Cambiado a número
}

// Define la estructura de la Venta
interface Venta {
    id_venta: number; // Cambiado de 'id' a 'id_venta'
    fecha: string; // Puedes usar Date si lo prefieres
    id_cliente: number; // Mantenido como 'id_cliente'
    id_producto: number; // Mantenido como 'id_producto'
}

// Cambia la URL de la API al puerto correcto
const API_URL = 'http://localhost:3000';

// Función para obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
    const response = await axios.get<Cliente[]>(`${API_URL}/clientes`);
    return response.data;
};

// Función para agregar un nuevo cliente
export const addCliente = async (nuevoCliente: Omit<Cliente, 'id_cliente'>): Promise<Cliente> => { // Cambiado a 'id_cliente'
    const response = await axios.post<Cliente>(`${API_URL}/clientes`, nuevoCliente);
    return response.data;
};

// Nuevas funciones para Productos

// Función para obtener todos los productos
export const getProductos = async (): Promise<Producto[]> => {
    const response = await axios.get<Producto[]>(`${API_URL}/productos`);
    return response.data;
};

// Función para agregar un nuevo producto
export const addProducto = async (nuevoProducto: Omit<Producto, 'id_producto'>): Promise<Producto> => { // Cambiado a 'id_producto'
    const response = await axios.post<Producto>(`${API_URL}/productos`, nuevoProducto);
    return response.data;
};

// Función para obtener todas las ventas
export const getVentas = async (): Promise<Venta[]> => {
    const response = await axios.get<Venta[]>(`${API_URL}/ventas`);
    return response.data;
};

// Función para agregar una nueva venta
export const addVenta = async (nuevaVenta: Omit<Venta, 'id_venta'>): Promise<Venta> => { // Cambiado a 'id_venta'
    const response = await axios.post<Venta>(`${API_URL}/ventas`, nuevaVenta);
    return response.data;
};
