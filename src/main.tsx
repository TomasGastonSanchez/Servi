import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.tsx';
import MenuPrincipal from './view/MenuPrincipal.tsx';
import Register from './Register';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Clientes from './view/Tablas/Clientes.tsx';
//import Productos from './view/Tablas/Productos.tsx';
//import Ventas from './view/Tablas/Ventas.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/clientes" element={<Clientes />} /> */}
        {/* <Route path="/productos" element={<Productos />} /> */}
        {/* <Route path="/ventas" element={<Ventas />} /> */}
      </Routes>
    </Router>
  </StrictMode>
);
