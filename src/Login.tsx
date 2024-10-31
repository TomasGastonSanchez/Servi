/*import React from 'react';*/
import fondoLogin from './galery/fondoLogin.jpg';
import { Container } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo3 from './galery/Logo3.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación si es necesario
    navigate('/'); // Redirige a la página principal después de iniciar sesión
  };
  
  return (
    <Container className="m-0 p-0 w-full h-full">

      <div className="bg-white h-screen grid grid-cols-1 md:grid-cols-2 w-screen">

        {/*Contenedor del laod izquierdo */}
        <div className="relative">
          <img src={fondoLogin} alt="Imagen del Login" className="w-full h-full object-cover" />
          <div className="absolute inset-0 text-center flex items-center">
            {/*absolute es para poner el texto por encima de la imagen */}
            <p className="text-white text-2xl font-bold text-center bg-black bg-opacity-50 p-4 rounded-lg">
              Con Servi, el futuro de tu estación de servicio está asegurado. Podrás cargar y guardar
              los datos necesarios para la mejor gestión de tus clientes, productos, ventas y más.
            </p>
          </div>
        </div>
        <div className='bg-blue-800'>
          <h1 className='bg-blue-900 p-4 text-white text-center font-semibold shadow-white text-4xl shadow-lg '>
            <img src={Logo3} alt="Icono" className="w-60 h-23 mx-auto rounded-xl" />
          </h1>
          <br />
          <h2 className='text-white font-bold text-center text-4xl'>
            Inicia Sesión:
          </h2>
          <div className="form-floating mb-3 m-5">
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
            <button onClick={handleLogin} className="btn btn-primary hover:bg-blue-700 transition-color" type="button">
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

export default Login;
