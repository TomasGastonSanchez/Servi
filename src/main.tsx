<<<<<<< HEAD
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.tsx';
import MenuPrincipal from './view/MenuPrincipal.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<MenuPrincipal />} />
      </Routes>
    </Router>
  </StrictMode>
);
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.tsx'
import Menu from './view/Menu.tsx'
import './index.css'
import Clientes from './view/Tablas/Clientes.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from './view/Tablas/Productos.tsx'
import Ventas from './view/Tablas/Ventas.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {<Menu />}
  </StrictMode>,
)

/*<Productos/>*/
/*<Clientes/>*/
/*<Ventas/>*/
//<App />
//<Menu />
>>>>>>> 54b95b0 (commit hecho)
