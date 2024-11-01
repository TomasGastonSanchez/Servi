import React, { useEffect, useState } from 'react';
import { getProductos, addProducto } from '../../api/api';

interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number; // Cambiado a número, puedes ajustarlo a decimal si lo prefieres
}

const Productos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, 'id'>>({
        nombre: '',
        descripcion: '',
        precio: 0 // Cambiado a número
    });

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        cargarProductos();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const productoAgregado = await addProducto(nuevoProducto);
            setProductos([...productos, productoAgregado]);
            setNuevoProducto({ nombre: '', descripcion: '', precio: 0 });
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Productos</h2>
            <form onSubmit={manejarEnvio} className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nuevoProducto.nombre}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                        required
                        className="border p-2"
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={nuevoProducto.descripcion}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                        required
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={nuevoProducto.precio}
                        onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
                        required
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Agregar Producto</button>
            </form>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Descripción</th>
                        <th className="py-2 px-4 border-b">Precio</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{producto.nombre}</td>
                            <td className="py-2 px-4 border-b">{producto.descripcion}</td>
                            <td className="py-2 px-4 border-b">${producto.precio.toFixed(2)}</td> {/* Formato de precio */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Productos;
