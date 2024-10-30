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

export default Ventas;
