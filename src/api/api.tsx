import axios from 'axios';

// Estructura del Cliente
interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    telefono: number;
    domicilio: string;
    cp: string;
}

// Estructura del Producto
interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

// Estructura de la Venta
interface Venta {
    id_venta: number;
    fecha: string; 
    id_cliente: number;
    id_producto: number;
}

// Estructura del Usuario
interface Usuario {
    id_usuario: number;
    email: string;
    password: string;
}

// Estructura del Detalle de Ventas (API)
interface DetalleVenta {
    id_detalle_venta: number;
    id_venta: number;
    id_producto: number;
    cantidad: number;
    precio: number; 
    importe: number; 
}

// URL de la API 

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
//const API_URL = 'http://localhost:3000';


// Función para obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
    const response = await axios.get<Cliente[]>(`${API_URL}/clientes`);
    return response.data;
};

// Función para agregar un nuevo cliente
export const addCliente = async (nuevoCliente: Omit<Cliente, 'id_cliente'>): Promise<Cliente> => {
    const response = await axios.post<Cliente>(`${API_URL}/clientes`, nuevoCliente);
    return response.data;
};

// Función para obtener todos los productos
export const getProductos = async (): Promise<Producto[]> => {
    const response = await axios.get<Producto[]>(`${API_URL}/productos`);
    return response.data;
};

// Función para agregar un nuevo producto
export const addProducto = async (nuevoProducto: Omit<Producto, 'id_producto'>): Promise<Producto> => {
    const response = await axios.post<Producto>(`${API_URL}/productos`, nuevoProducto);
    return response.data;
};

// Función para obtener todas las ventas
export const getVentas = async (): Promise<Venta[]> => {
    const response = await axios.get<Venta[]>(`${API_URL}/ventas`);
    return response.data;
};

// Función para agregar una nueva venta
export const addVenta = async (nuevaVenta: Omit<Venta, 'id_venta'>): Promise<Venta> => {
    const response = await axios.post<Venta>(`${API_URL}/ventas`, nuevaVenta);
    return response.data;
};

// Función para obtener todos los usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
    const response = await axios.get<Usuario[]>(`${API_URL}/usuarios`);
    return response.data;
};

// Función para agregar un nuevo usuario
export const addUsuario = async (nuevoUsuario: Omit<Usuario, 'id_usuario'>): Promise<Usuario> => {
    const response = await axios.post<Usuario>(`${API_URL}/usuarios`, nuevoUsuario);
    return response.data;
};

// Función para obtener todos los detalles de ventas
export const getDetalleVentas = async (): Promise<DetalleVenta[]> => {
    const response = await axios.get<DetalleVenta[]>(`${API_URL}/detalles_ventas`);
    return response.data;
};

// Función para agregar un nuevo detalle de venta
/*
export const addDetalleVenta = async (nuevoDetalleVenta: Omit<DetalleVenta, 'id_detalle_venta'>): Promise<DetalleVenta> => {
    const response = await axios.post<DetalleVenta>(`${API_URL}/detalles_ventas`, nuevoDetalleVenta);
    return response.data;
};
*/

export const addDetalleVenta = async (
    nuevoDetalleVenta: Omit<DetalleVenta, 'id_detalle_venta' | 'importe'>
): Promise<DetalleVenta> => {
    const response = await axios.post<DetalleVenta>(`${API_URL}/detalles_ventas`, nuevoDetalleVenta);
    return response.data;
};

// Función para obtener un producto por su ID
export const getProductoPorId = async (id_producto: number): Promise<Producto | null> => {
    const response = await axios.get<Producto>(`${API_URL}/productos/${id_producto}`);
    return response.data || null;
};

