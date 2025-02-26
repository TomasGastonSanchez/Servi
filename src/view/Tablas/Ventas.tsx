<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { getVentas, addVenta } from '../../api/api';

interface Venta {
    id_venta: number;
    fecha: string; // Fecha como string ISO
    id_cliente: number;
    id_producto: number;
}

const Ventas = () => {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [nuevaVenta, setNuevaVenta] = useState<Omit<Venta, 'id_venta'>>({
        fecha: '',
        id_cliente: 0,
        id_producto: 0,
    });
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [fechaDesde, setFechaDesde] = useState<string>('');
    const [fechaHasta, setFechaHasta] = useState<string>('');

    useEffect(() => {
        const cargarVentas = async () => {
            try {
                const data: Venta[] = await getVentas();
                setVentas(data);
            } catch (error) {
                console.error('Error al cargar ventas:', error);
            }
        };
        cargarVentas();
    }, []);

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMensaje(null);
        try {
            const ventaAgregada: Venta = await addVenta(nuevaVenta);
            setVentas([...ventas, ventaAgregada]);
            setNuevaVenta({ fecha: '', id_cliente: 0, id_producto: 0 });
            setMensaje('Venta agregada con éxito!');
        } catch (error) {
            console.error('Error al agregar la venta:', error);
            setMensaje('Error al agregar la venta. Inténtalo de nuevo.');
        }
    };

    const ventasFiltradas = ventas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha);
        const desde = fechaDesde ? new Date(fechaDesde) : null;
        const hasta = fechaHasta ? new Date(fechaHasta) : null;

        return (!desde || fechaVenta >= desde) && (!hasta || fechaVenta <= hasta);
    });

    return (
        <div className="container mx-auto p-6 bg-blue-600 text-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center">Ventas</h2>
            <form onSubmit={manejarEnvio} className="bg-blue-500 p-6 rounded-lg mb-6 shadow-md">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Fecha</label>
                        <input
                            type="date"
                            value={nuevaVenta.fecha}
                            onChange={(e) => setNuevaVenta({ ...nuevaVenta, fecha: e.target.value })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">ID Cliente</label>
                        <input
                            type="number"
                            value={nuevaVenta.id_cliente}
                            onChange={(e) => setNuevaVenta({ ...nuevaVenta, id_cliente: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">ID Producto</label>
                        <input
                            type="number"
                            value={nuevaVenta.id_producto}
                            onChange={(e) => setNuevaVenta({ ...nuevaVenta, id_producto: Number(e.target.value) })}
                            required
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white mt-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                >
                    Agregar Venta
                </button>
            </form>

            {mensaje && <div className="bg-green-500 text-white p-2 rounded mb-4">{mensaje}</div>}

            {/* Filtros por fecha */}
            <div className="bg-blue-500 p-6 rounded-lg mb-6 shadow-md">
                <h3 className="text-xl font-bold mb-4">Filtrar Ventas por Fecha</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-semibold">Desde</label>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Hasta</label>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                            className="p-3 rounded border border-gray-300 bg-white text-gray-700 w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Tabla de ventas */}
            <div className="overflow-x-auto bg-white p-0 rounded-lg shadow-md">
                <table className="min-w-full bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b">ID Venta</th>
                            <th className="py-3 px-4 border-b">Fecha</th>
                            <th className="py-3 px-4 border-b">ID Cliente</th>
                            <th className="py-3 px-4 border-b">ID Producto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasFiltradas.map((venta) => (
                            <tr key={venta.id_venta} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border-b">{venta.id_venta}</td>
                                <td className="py-3 px-4 border-b">
                                    {new Date(venta.fecha).toISOString().split('T')[0]}
                                </td>
                                <td className="py-3 px-4 border-b">{venta.id_cliente}</td>
                                <td className="py-3 px-4 border-b">{venta.id_producto}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
=======
import React, { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// Definir el tipo de Venta
interface Venta {
  id_venta: number;
  fecha: string;
  id_cliente: number;
  id_producto: number;
}

// Datos de ejemplo para ventas
const DatosVentas: Venta[] = [
  { id_venta: 1, fecha: '2024-09-01', id_cliente: 1, id_producto: 2 },
  { id_venta: 2, fecha: '2024-09-02', id_cliente: 2, id_producto: 1 },
  { id_venta: 3, fecha: '2024-09-03', id_cliente: 3, id_producto: 3 },
  { id_venta: 4, fecha: '2024-09-04', id_cliente: 4, id_producto: 4 }
];

function Ventas() {
  const [ventas] = useState<Venta[]>(DatosVentas);
  const [modal, setModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState<Venta | null>(null);

  const toggle = () => setModal(!modal);

  const handleEditar = (venta: Venta) => {
    setVentaSeleccionada(venta);
    toggle();
  };

  return (
    <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg h-full w-full">
      <h1 className="text-center text-3xl font-bold mb-6">Gestión de Ventas</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button 
          onClick={toggle} 
          color="success"
          className="font-bold py-2 px-4 rounded-3xl"
        >
          Agregar Venta
        </Button>
      </div>

      <Table dark bordered responsive className="text-center">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>ID Cliente</th>
            <th>ID Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id_venta}>
              <td>{venta.id_venta}</td>
              <td>{venta.fecha}</td>
              <td>{venta.id_cliente}</td>
              <td>{venta.id_producto}</td>
              <td className="d-flex justify-content-center">
                <Button color="primary" className="mr-2" onClick={() => handleEditar(venta)}>
                  Editar
                </Button>
                <Button color="danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-gray-700 text-white">Editar Venta</ModalHeader>
        <ModalBody className="bg-blue-900 text-white">
          <Form>
            <FormGroup>
              <Label for="fecha">Fecha</Label>
              <Input 
                type="date" 
                id="fecha" 
                defaultValue={ventaSeleccionada?.fecha || ''} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="id_cliente">ID Cliente</Label>
              <Input 
                type="number" 
                id="id_cliente" 
                defaultValue={ventaSeleccionada?.id_cliente || 0} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="id_producto">ID Producto</Label>
              <Input 
                type="number" 
                id="id_producto" 
                defaultValue={ventaSeleccionada?.id_producto || 0} 
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter className="bg-gray-700 text-white">
          <Button color="primary">Guardar</Button>
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
>>>>>>> 54b95b0 (commit hecho)

export default Ventas;
