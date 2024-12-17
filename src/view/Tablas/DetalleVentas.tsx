import React, { useEffect, useState } from 'react';
import { getDetalleVentas, addDetalleVenta, getProductos } from '../../api/api';

interface DetalleVenta {
    id_detalle_venta: number;
    id_venta: number;
    id_producto: number;
    cantidad: number;
    precio: number;
    importe: number;
}

const DetalleVentas = () => {
    const [detallesVentas, setDetallesVentas] = useState<DetalleVenta[]>([]);
    const [productos, setProductos] = useState<any[]>([]);
    const [nuevoDetalle, setNuevoDetalle] = useState<Omit<DetalleVenta, 'id_detalle_venta'>>({
        id_venta: 0,
        id_producto: 0,
        cantidad: 1,
        precio: 0,
        importe: 0,
    });
    const [mensaje, setMensaje] = useState<string | null>(null);

    useEffect(() => {
        const cargarDetallesVentas = async () => {
            try {
                const data: DetalleVenta[] = await getDetalleVentas();
                setDetallesVentas(data);
            } catch (error) {
                console.error("Error al cargar detalles de ventas:", error);
            }
        };

        const cargarProductos = async () => {
            try {
                const data = await getProductos();
                setProductos(data);
            } catch (error) {
                console.error("Error al cargar productos:", error);
            }
        };

        cargarDetallesVentas();
        cargarProductos();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje(null);

        try {
            const importe = nuevoDetalle.precio * nuevoDetalle.cantidad;  // Cálculo del importe

            // Enviar sin el campo 'importe' porque lo calculamos aquí
            const { id_venta, id_producto, cantidad, precio } = nuevoDetalle;

            const detalleAgregado: DetalleVenta = await addDetalleVenta({ id_venta, id_producto, cantidad, precio });

            // Incluir el importe calculado en la respuesta
            setDetallesVentas([...detallesVentas, { ...detalleAgregado, importe }]);

            setNuevoDetalle({ id_venta: 0, id_producto: 0, cantidad: 1, precio: 0, importe: 0 });
            setMensaje('Detalle de venta agregado con éxito!');
        } catch (error) {
            console.error("Error al agregar detalle de venta:", error);
            setMensaje('Error al agregar el detalle de venta. Inténtalo de nuevo.');
        }
    };

    const obtenerPrecioProducto = (id_producto: number) => {
        const producto = productos.find(p => p.id_producto === id_producto);
        return producto ? producto.precio : 0; 
    };

    const manejarCambioProducto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id_producto = Number(e.target.value);
        setNuevoDetalle(prevDetalle => ({
            ...prevDetalle,
            id_producto,
            precio: obtenerPrecioProducto(id_producto),
        }));
    };

    return (
        <div className="container mx-auto p-6 bg-blue-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Detalle de Ventas</h2>
            <form onSubmit={manejarEnvio} className="bg-blue-500 p-6 rounded-lg mb-6 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">ID Venta</label>
                        <input
                            type="number"
                            value={nuevoDetalle.id_venta}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, id_venta: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">ID Producto</label>
                        <input
                            type="number"
                            value={nuevoDetalle.id_producto}
                            onChange={manejarCambioProducto}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Precio</label>
                        <input
                            type="number"
                            value={nuevoDetalle.precio}
                            readOnly
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Cantidad</label>
                        <input
                            type="number"
                            value={nuevoDetalle.cantidad}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, cantidad: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-green-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition">Agregar Detalle de Venta</button>
            </form>
            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}
            <table className="w-full bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="py-3 px-4 border-b">ID Venta</th>
                        <th className="py-3 px-4 border-b">ID Producto</th>
                        <th className="py-3 px-4 border-b">Precio</th>
                        <th className="py-3 px-4 border-b">Cantidad</th>
                        <th className="py-3 px-4 border-b">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    {detallesVentas.map(detalle => (
                        <tr key={detalle.id_detalle_venta} className="hover:bg-gray-100">
                            <td className="py-3 px-4 border-b">{detalle.id_venta}</td>
                            <td className="py-3 px-4 border-b">{detalle.id_producto}</td>
                            <td className="py-3 px-4 border-b">{detalle.precio}</td>
                            <td className="py-3 px-4 border-b">{detalle.cantidad}</td>
                            <td className="py-3 px-4 border-b">{detalle.importe}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetalleVentas;
