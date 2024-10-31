import React, { useEffect, useState } from 'react';
import { getClientes, addCliente } from '../../api/api';

interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: number;
    domicilio: string;
    cp: string;
}

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id'>>({
        nombre: '',
        apellido: '',
        telefono: 0, // Cambiado a número
        domicilio: '',
        cp: ''
    });

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error("Error al cargar clientes:", error);
            }
        };
        cargarClientes();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const clienteAgregado = await addCliente(nuevoCliente);
            setClientes([...clientes, clienteAgregado]);
            setNuevoCliente({ nombre: '', apellido: '', telefono: 0, domicilio: '', cp: '' });
        } catch (error) {
            console.error("Error al agregar cliente:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Clientes</h2>
            <form onSubmit={manejarEnvio} className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre" value={nuevoCliente.nombre} onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })} required className="border p-2" />
                    <input type="text" placeholder="Apellido" value={nuevoCliente.apellido} onChange={(e) => setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })} required className="border p-2" />
                    <input type="number" placeholder="Teléfono" value={nuevoCliente.telefono} onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: Number(e.target.value) })} required className="border p-2" />
                    <input type="text" placeholder="Domicilio" value={nuevoCliente.domicilio} onChange={(e) => setNuevoCliente({ ...nuevoCliente, domicilio: e.target.value })} required className="border p-2" />
                    <input type="text" placeholder="Código Postal" value={nuevoCliente.cp} onChange={(e) => setNuevoCliente({ ...nuevoCliente, cp: e.target.value })} required className="border p-2" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Agregar Cliente</button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Apellido</th>
                        <th className="py-2 px-4 border-b">Teléfono</th>
                        <th className="py-2 px-4 border-b">Domicilio</th>
                        <th className="py-2 px-4 border-b">Código Postal</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{cliente.nombre}</td>
                            <td className="py-2 px-4 border-b">{cliente.apellido}</td>
                            <td className="py-2 px-4 border-b">{cliente.telefono}</td>
                            <td className="py-2 px-4 border-b">{cliente.domicilio}</td>
                            <td className="py-2 px-4 border-b">{cliente.cp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
