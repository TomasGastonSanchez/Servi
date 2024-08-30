import React from 'react';
import ReactDOM from 'react-dom';
import fondoLogin from './galery/fondoLogin.jpg'
import { Container } from 'reactstrap'
import '@fortawesome/fontawesome-free/css/all.min.css';


//Login

function App() {
  return (

    //Contenedor de todo el login de mi proyecto
    <Container className="m-0 p-0 w-full h-full">
      
      <div className="bg-white h-screen grid grid-cols-1 md:grid-cols-2 w-screen"> 
        <div className="relative">
            <img src={fondoLogin} alt="Imagen" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-2xl font-bold text-center bg-black bg-opacity-50 p-4 rounded-lg">
                  Con Servi, el futuro de tu estación de servicio está asegurado. Podrás cargar y guardar
                  los datos necesarios para la mejor gestión de tus clientes, productos, ventas y más.
            </p>
          </div>
        </div>
        <div className='bg-slate-600'>
          <h1 className='bg-blue-900 p-4 text-white text-center font-semibold shadow-white text-4xl shadow-lg '>
            Servi
          </h1>
          <br />
          <br />
          <h2 className='font-light font-serif from-neutral-400 text-white p-0 text-center'>
            Inicia Sesión:
            </h2>

          <div className="form-floating mb-3 m-5 ">
            <input
              type="email"
              className="form-control"
              id="floatingInputEmail"
              placeholder=""
            />

            <label htmlFor="floatingInputEmail" className="text-light-emphasis hgi-solid hgi-sharp hgi-mail-01">
              <i className="fas fa-envelope"></i> Email
            </label>

          </div>
          <div className="form-floating mb-2 m-5 my-1">
            <input
              type="password"
              className="form-control"
              id="floatingInputPassword"
              placeholder=""
            />

            <label htmlFor="floatingInputPassword" className="text-light-emphasis">
              <i className="fa-solid fa-lock"></i> Contraseña
            </label>

          </div>
          <div className="d-grid gap-2 py-2 m-5 my-2">
      
              <button className="btn btn-primary hover:bg-blue-700 transition-color" type="submit">
                Iniciar Sesión
              </button>
              
            
          </div>
          <footer className='text-center mt-4 absolute bottom-0 p-1 m-1'>
              <p>Copyright©2024 todos los derechos de autor reservados</p>
          </footer>
        </div>
      </div>
    </Container>
  );
}

export default App;


