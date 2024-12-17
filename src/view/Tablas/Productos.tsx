import React, { useEffect, useState } from 'react';
import { getProductos, addProducto } from '../../api/api';

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: number;
}

const Productos = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [nuevoProducto, setNuevoProducto] = useState<Omit<Producto, 'id_producto'>>({
        nombre: '',
        descripcion: '',
        precio: 0
    });
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await getProductos();
                const productosConPrecio = data.map((producto: Producto) => ({
                    ...producto,
                    precio: parseFloat(producto.precio as unknown as string) || 0,
                }));
                setProductos(productosConPrecio);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };
        cargarProductos();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje(null);
        try {
            const productoAgregado = await addProducto(nuevoProducto);
            setProductos([...productos, productoAgregado]);
            setNuevoProducto({ nombre: '', descripcion: '', precio: 0 });
            setMensaje('Producto agregado con éxito!');
        } catch (error) {
            console.error("Error al agregar producto:", error);
            setMensaje('Error al agregar el producto. Inténtalo de nuevo.');
        }
    };

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="container mx-auto p-6 bg-blue-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Productos</h2>
            <form onSubmit={manejarEnvio} className="bg-blue-500 p-6 rounded-lg mb-6 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Nombre</label>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nuevoProducto.nombre}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Descripción</label>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={nuevoProducto.descripcion}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Precio</label>
                        <input
                            type="number"
                            placeholder="Precio"
                            value={nuevoProducto.precio}
                            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Agregar Producto
                </button>
            </form>
            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}

            <div className="mb-4">
                <label className="block mb-1 font-semibold">Buscar Producto</label>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                />
            </div>

            {productosFiltrados.length === 0 ? (
                <p>No hay productos disponibles.</p>
            ) : (
                <table className="w-full bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b">ID Producto</th>
                            <th className="py-3 px-4 border-b">Nombre</th>
                            <th className="py-3 px-4 border-b">Descripción</th>
                            <th className="py-3 px-4 border-b">Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map(producto => (
                            <tr key={producto.id_producto} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border-b">{producto.id_producto}</td>
                                <td className="py-3 px-4 border-b">{producto.nombre}</td>
                                <td className="py-3 px-4 border-b">{producto.descripcion}</td>
                                <td className="py-3 px-4 border-b">{producto.precio}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Productos;
