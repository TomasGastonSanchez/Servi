import React, { useState } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

// Definir el tipo de Producto
interface Producto {
  id: number;
  nombre: string;
  desc: string;
  precio: number;
}

const DatosProductos: Producto[] = [
  { id: 1, nombre: "Nafta Super", desc: "1L de Nafta Común", precio: 200 },
  { id: 2, nombre: "Nafta Premium", desc: "1L de Nafta Premium", precio: 250 },
  { id: 3, nombre: "Gasoil Evolux", desc: "1L de Gasoil Común", precio: 220 },
  { id: 4, nombre: "Gasoil Premium", desc: "1L de Gasoil Premium", precio: 270 }
];

function Productos() {
  const [productos] = useState<Producto[]>(DatosProductos);
  const [modal, setModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null); // Acepta null cuando no se selecciona un producto

  const toggle = () => setModal(!modal);

  const handleEditar = (producto: Producto) => {
    setProductoSeleccionado(producto);
    toggle();
  };

  return (
    <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg h-full w-full">
      <h1 className="text-center text-3xl font-bold mb-6">Gestión de Productos</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button 
          onClick={toggle} 
          color="success"
          className="font-bold py-2 px-4 rounded-3xl"
        >
          Agregar Producto
        </Button>
      </div>

      <Table dark bordered responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.desc}</td>
              <td>${producto.precio}</td>
              <td className="d-flex justify-content-center">
                <Button color="primary" className="mr-2" onClick={() => handleEditar(producto)}>
                  Editar
                </Button>
                <Button color="danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-gray-700 text-white">Editar Producto</ModalHeader>
        <ModalBody className="bg-blue-900 text-white">
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input 
                type="text" 
                id="nombre" 
                defaultValue={productoSeleccionado?.nombre || ''} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="desc">Descripción</Label>
              <Input 
                type="text" 
                id="desc" 
                defaultValue={productoSeleccionado?.desc || ''} 
              />
            </FormGroup>
            <FormGroup>
              <Label for="precio">Precio</Label>
              <Input 
                type="number" 
                id="precio" 
                defaultValue={productoSeleccionado?.precio || ''} 
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

export default Productos;
