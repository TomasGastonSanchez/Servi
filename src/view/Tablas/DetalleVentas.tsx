import React, { useEffect, useState } from 'react';
import { getDetalleVentas, addDetalleVenta } from '../../api/api';

interface DetalleVenta {
    id_detalle_venta: number;
    id_venta: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: number;
    subtotal: number;
}

const DetalleVentas = () => {
    const [detallesVentas, setDetallesVentas] = useState<DetalleVenta[]>([]);
    const [nuevoDetalle, setNuevoDetalle] = useState<Omit<DetalleVenta, 'id_detalle_venta' | 'subtotal'>>({
        id_venta: 0,
        id_producto: 0,
        cantidad: 0,
        precio_unitario: 0,
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
        cargarDetallesVentas();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje(null);

        const subtotal = Number((nuevoDetalle.precio_unitario * nuevoDetalle.cantidad).toFixed(2)); // Calcula subtotal con 2 decimales
        
        try {
            const detalleAgregado: DetalleVenta = await addDetalleVenta({ ...nuevoDetalle, subtotal });
            setDetallesVentas([...detallesVentas, detalleAgregado]);
            setNuevoDetalle({ id_venta: 0, id_producto: 0, cantidad: 0, precio_unitario: 0 });
            setMensaje('Detalle de venta agregado con éxito!');
        } catch (error) {
            console.error("Error al agregar detalle de venta:", error);
            setMensaje('Error al agregar el detalle de venta. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-4 bg-blue-600">
            <h2 className="text-2xl font-bold mb-4">Detalle de Ventas</h2>
            <form onSubmit={manejarEnvio} className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">ID Venta</label>
                        <input
                            type="number"
                            value={nuevoDetalle.id_venta}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, id_venta: Number(e.target.value) })}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">ID Producto</label>
                        <input
                            type="number"
                            value={nuevoDetalle.id_producto}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, id_producto: Number(e.target.value) })}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Precio Unitario</label>
                        <input
                            type="number"
                            value={nuevoDetalle.precio_unitario}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, precio_unitario: Number(e.target.value) })}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Cantidad</label>
                        <input
                            type="number"
                            value={nuevoDetalle.cantidad}
                            onChange={(e) => setNuevoDetalle({ ...nuevoDetalle, cantidad: Number(e.target.value) })}
                            required
                            className="border p-2 w-full"
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Agregar Detalle de Venta</button>
            </form>
            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">ID Venta</th>
                        <th className="py-2 px-4 border-b">ID Producto</th>
                        <th className="py-2 px-4 border-b">Precio Unitario</th>
                        <th className="py-2 px-4 border-b">Cantidad</th>
                        <th className="py-2 px-4 border-b">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {detallesVentas.map(detalle => (
                        <tr key={detalle.id_detalle_venta} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{detalle.id_venta}</td>
                            <td className="py-2 px-4 border-b">{detalle.id_producto}</td>
                            <td className="py-2 px-4 border-b">{detalle.precio_unitario}</td>
                            <td className="py-2 px-4 border-b">{detalle.cantidad}</td>
                            <td className="py-2 px-4 border-b">{detalle.subtotal}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DetalleVentas;
