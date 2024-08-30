import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Menu from './view/Menu.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Productos from './view/Tablas/Productos.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<App/>*/}
    <Productos/>
    {/*<Menu />*/}
  </StrictMode>,
)

//<App />
//<Menu />