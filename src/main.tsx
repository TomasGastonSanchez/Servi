import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.tsx';
import MenuPrincipal from './view/MenuPrincipal.tsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<MenuPrincipal />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  </StrictMode>
);
