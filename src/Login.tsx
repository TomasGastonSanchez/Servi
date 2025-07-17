import { useState, useEffect } from 'react';
import fondoLogin from './galery/fondoLogin.jpg';
import { Container } from 'reactstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo3 from './galery/Logo3.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    const alertaYaMostrada = localStorage.getItem('alertaLoginMostrada');
  
    if (!alertaYaMostrada) {
      alert('⚠️ ¡ALERTA! Actualmente la aplicación funciona sin base de datos por tareas de mantenimiento. Para ver el sistema, simplemente toque en "INICIAR SESIÓN".');
      localStorage.setItem('alertaLoginMostrada', 'true');
    }
  }, []);
  


/* METODO DE LOGIN CORRECTO

const handleLogin = async () => {
  try {
    const response = await fetch('https://tubackendrailway.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.success) {
      navigate('/menu');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
*/


//METODO DE LOGIN TEMPORAL
const handleLogin = () => {
  navigate('/menu');
};

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <Container className="m-0 p-0 w-full h-full">
      <div className="bg-white h-screen grid grid-cols-1 md:grid-cols-2 w-screen">
        <div className="relative">
          <img src={fondoLogin} alt="Imagen del Login" className="w-full h-full object-cover" />
          <div className="absolute inset-0 text-center flex items-center">
            <p className="text-white text-2xl font-bold text-center bg-black bg-opacity-50 p-4 rounded-lg">
              Con Servi, el futuro de tu estación de servicio está asegurado. Podrás cargar y guardar
              los datos necesarios para la mejor gestión de tus clientes, productos, ventas y más.
            </p>
          </div>
        </div>
        <div className="bg-blue-800">
          <h1 className="bg-blue-900 p-4 text-white text-center font-semibold shadow-white text-4xl shadow-lg">
            <img src={Logo3} alt="Icono" className="w-60 h-23 mx-auto rounded-xl" />
          </h1>
          <br />
          <h2 className="text-white font-bold text-center text-4xl">Inicia Sesión:</h2>
          <div className="form-floating mb-3 m-5">
            <input
              type="email"
              className="form-control"
              id="floatingInputEmail"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInputEmail" className="text-light-emphasis">
              <i className="fas fa-envelope"></i> Email
            </label>
          </div>
          <div className="form-floating mb-2 m-5 my-1">
            <input
              type="password"
              className="form-control"
              id="floatingInputPassword"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingInputPassword" className="text-light-emphasis">
              <i className="fa-solid fa-lock"></i> Contraseña
            </label>
          </div>
          <div className="d-grid gap-2 py-2 m-5 my-2">
            <button onClick={handleLogin} className="btn btn-primary hover:bg-blue-700 transition-color font-bold" type="button">
              Iniciar Sesión
            </button>
          </div>
          <div className="m-5 my-2 text-white">
            <p>¿No tienes una cuenta?
              <button className="hover:text-blue-400 p-1 font-bold" onClick={goToRegister}>
                Crea una desde acá
              </button>
            </p>
          </div>
          <footer className="text-center text-white mt-4 absolute bottom-0 p-1 m-1">
            <p>Copyright©2024 todos los derechos de autor reservados.</p>
          </footer>
        </div>
      </div>
    </Container>
  );
}

export default Login;
