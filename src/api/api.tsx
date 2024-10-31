// src/api/api.tsx
import axios from 'axios';

// Define la estructura del Cliente
interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    domicilio: string;
    cp: string;
}

// Cambia la URL de la API al puerto correcto
const API_URL = 'http://localhost:3000';

// Función para obtener todos los clientes
export const getClientes = async (): Promise<Cliente[]> => {
    const response = await axios.get<Cliente[]>(`${API_URL}/clientes`);
    return response.data;
};

// Función para agregar un nuevo cliente
export const addCliente = async (nuevoCliente: Omit<Cliente, 'id'>): Promise<Cliente> => {
    const response = await axios.post<Cliente>(`${API_URL}/clientes`, nuevoCliente);
    return response.data;
};
