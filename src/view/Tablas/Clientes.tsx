import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

const DatosClientes = [
  { id: 1, nombre: "Julio", apellido: "Cesar", tel: 3415362285, dom: "Felipe More 1414", cp: 2021 },
  { id: 2, nombre: "Ramón", apellido: "Martinez", tel: 3413771940, dom: "San Lorenzo 939", cp: 2000 },
  { id: 3, nombre: "Julian",  apellido: "Serrano", tel: 3411152634, dom: "Alsina 732", cp: 2000 },
  { id: 4, nombre: "Lionel", apellido: "Mena", tel: 3418291052, dom: "Vera Mujica 1056", cp: 2001 }
];

function Clientes() {
  const [clientes] = useState(DatosClientes);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg h-full w-full">
      <h1 className="text-center text-3xl font-bold mb-6">Gestión de Clientes</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button 
          onClick={toggle} 
          color="success" // Usar color de Bootstrap
          className="font-bold py-2 px-4 rounded-3xl"
        >
          Agregar Cliente
        </Button>
      </div>

      <Table dark bordered responsive className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Domicilio</th>
            <th>Codigo Postal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.tel}</td>
              <td>{cliente.dom}</td>
              <td>{cliente.cp}</td>
              <td className="d-flex justify-content-center">
                <Button color="primary" className="mr-2">Editar</Button>
                <Button color="danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle} className="bg-gray-700 text-white">Editar Cliente</ModalHeader>
        <ModalBody className="bg-blue-900 text-white">
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input type="text" id="nombre" />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input type="text" id="apellido" />
            </FormGroup>
            <FormGroup>
              <Label for="tel">Teléfono</Label>
              <Input type="text" id="tel" />
            </FormGroup>
            <FormGroup>
              <Label for="dom">Domicilio</Label>
              <Input type="text" id="dom" />
            </FormGroup>
            <FormGroup>
              <Label for="cp">Código Postal</Label>
              <Input type="text" id="cp" />
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

export default Clientes;
