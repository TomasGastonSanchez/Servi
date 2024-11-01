import React, { useEffect, useState } from 'react';
import { getVentas, addVenta } from '../../api/api';

interface Venta {
    id_venta: number; // Cambiado de id_ventas a id_venta
    fecha: string; // Podrías cambiar a Date si lo prefieres
    id_cliente: number;
    id_producto: number;
}

// Cambiamos a Omit<Venta, 'id_venta'> para reflejar correctamente el tipo
const Ventas = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [nuevaVenta, setNuevaVenta] = useState<Omit<Venta, 'id_venta'>>({
        fecha: '',
        id_cliente: 0,
        id_producto: 0,
    });
    const [mensaje, setMensaje] = useState<string | null>(null);

    useEffect(() => {
        const cargarVentas = async () => {
            try {
                const data: Venta[] = await getVentas(); // Asegúrate que esto retorna un array de Venta
                setVentas(data);
            } catch (error) {
                console.error("Error al cargar ventas:", error);
            }
        };
        cargarVentas();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje(null); // Reinicia el mensaje
        try {
            const ventaAgregada: Venta = await addVenta(nuevaVenta); // Asegúrate que esto retorna un objeto Venta
            setVentas([...ventas, ventaAgregada]); // Aquí se espera que ventaAgregada tenga id_venta
            setNuevaVenta({ fecha: '', id_cliente: 0, id_producto: 0 });
            setMensaje('Venta agregada con éxito!');
        } catch (error) {
            console.error("Error al agregar venta:", error);
            setMensaje('Error al agregar la venta. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Ventas</h2>
            <form onSubmit={manejarEnvio} className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        type="date"
                        placeholder="Fecha"
                        value={nuevaVenta.fecha}
                        onChange={(e) => setNuevaVenta({ ...nuevaVenta, fecha: e.target.value })}
                        required
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="ID Cliente"
                        value={nuevaVenta.id_cliente}
                        onChange={(e) => setNuevaVenta({ ...nuevaVenta, id_cliente: Number(e.target.value) })}
                        required
                        className="border p-2"
                    />
                    <input
                        type="number"
                        placeholder="ID Producto"
                        value={nuevaVenta.id_producto}
                        onChange={(e) => setNuevaVenta({ ...nuevaVenta, id_producto: Number(e.target.value) })}
                        required
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Agregar Venta</button>
            </form>
            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">ID Cliente</th>
                        <th className="py-2 px-4 border-b">ID Producto</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map(venta => (
                        <tr key={venta.id_venta} className="hover:bg-gray-100"> {/* Cambiado a id_venta */}
                            <td className="py-2 px-4 border-b">{venta.fecha}</td>
                            <td className="py-2 px-4 border-b">{venta.id_cliente}</td>
                            <td className="py-2 px-4 border-b">{venta.id_producto}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Ventas;
