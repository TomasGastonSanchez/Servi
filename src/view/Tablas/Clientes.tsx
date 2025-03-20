import React, { useEffect, useState } from 'react';
import { getClientes, addCliente } from '../../api/api';

interface Cliente {
    id_cliente: number;
    nombre: string;
    apellido: string;
    telefono: number;
    domicilio: string;
    cp: string;
}

const Clientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id_cliente'>>({
        nombre: '',
        apellido: '',
        telefono: 0,
        domicilio: '',
        cp: ''
    });
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState('');

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
        setMensaje(null);
        try {
            const clienteAgregado = await addCliente(nuevoCliente);
            setClientes([...clientes, clienteAgregado]);
            setNuevoCliente({ nombre: '', apellido: '', telefono: 0, domicilio: '', cp: '' });
            setMensaje('Cliente agregado con éxito!');
        } catch (error) {
            console.error("Error al agregar cliente:", error);
            setMensaje('Error al agregar el cliente. Inténtalo de nuevo.');
        }
    };

    const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.apellido.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 bg-blue-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Clientes</h2>
            <form onSubmit={manejarEnvio} className="bg-blue-500 p-6 rounded-lg mb-6 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nuevoCliente.nombre}
                            onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Apellido</label>
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={nuevoCliente.apellido}
                            onChange={(e) => setNuevoCliente({ ...nuevoCliente, apellido: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Teléfono</label>
                        <input
                            type="number"
                            placeholder="Teléfono"
                            value={nuevoCliente.telefono}
                            onChange={(e) => setNuevoCliente({ ...nuevoCliente, telefono: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Domicilio</label>
                        <input
                            type="text"
                            placeholder="Domicilio"
                            value={nuevoCliente.domicilio}
                            onChange={(e) => setNuevoCliente({ ...nuevoCliente, domicilio: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Código Postal</label>
                        <input
                            type="text"
                            placeholder="Código Postal"
                            value={nuevoCliente.cp}
                            onChange={(e) => setNuevoCliente({ ...nuevoCliente, cp: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Agregar Cliente
                </button>
            </form>
            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">Buscar Cliente</label>
                <input
                    type="text"
                    placeholder="Buscar por nombre o apellido"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                />
            </div>
            <table className="w-full bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-4 border-b">ID Cliente</th>
                        <th className="py-3 px-4 border-b">Nombre</th>
                        <th className="py-3 px-4 border-b">Apellido</th>
                        <th className="py-3 px-4 border-b">Teléfono</th>
                        <th className="py-3 px-4 border-b">Domicilio</th>
                        <th className="py-3 px-4 border-b">Código Postal</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesFiltrados.map(cliente => (
                        <tr key={cliente.id_cliente} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border-b">{cliente.id_cliente}</td>
                            <td className="py-3 px-4 border-b">{cliente.nombre}</td>
                            <td className="py-3 px-4 border-b">{cliente.apellido}</td>
                            <td className="py-3 px-4 border-b">{cliente.telefono}</td>
                            <td className="py-3 px-4 border-b">{cliente.domicilio}</td>
                            <td className="py-3 px-4 border-b">{cliente.cp}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Clientes;
