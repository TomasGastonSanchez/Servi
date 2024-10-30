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
    {<Login />}
    {<Menu />}
  </StrictMode>,
)

/*<Productos/>*/
/*<Clientes/>*/
/*<Ventas/>*/
//<App />
//<Menu />