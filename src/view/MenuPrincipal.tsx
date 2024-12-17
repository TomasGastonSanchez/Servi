import { useState } from "react";
import Logo3 from '../galery/Logo3.png';
import MainInicio from '../galery/MainInicio.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Productos from "./Tablas/Productos";
import Clientes from './Tablas/Clientes';
import Ventas from './Tablas/Ventas';
import { useNavigate } from "react-router-dom";
import DetalleVentas from "./Tablas/DetalleVentas";

function MenuPrincipal() {
  const [showButton, setShowButton] = useState<string | null>(null);
  const navigate = useNavigate();

  const Opciones = () => {
    switch (showButton) {
      case 'clientes':
        return <Clientes />;
      case 'productos':
        return <Productos />;
      case 'ventas':
        return <Ventas />;
      case 'detalle_ventas':
        return <DetalleVentas />;
      case 'ayuda':
        return (
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-4 text-center text-yellow-300">Ayuda y Soporte</h2>
            <div className="bg-blue-800 p-6 rounded-lg shadow-md mb-6">
              <p className="mb-2 text-lg">Si necesitas soporte, puedes contactarnos a través de los siguientes medios:</p>
              <ul className="list-disc list-inside text-lg">
                <li>📞 Teléfono: <a href="tel:+123456789" className="text-yellow-300">+54 341 335xxxx</a></li>
                <li>📧 Email: <a href="mailto:soporte@empresa.com" className="text-yellow-300">tomasgastonsanchez2002@gmail.com</a></li>
              </ul>
            </div>
            <div className="bg-blue-800 p-6 rounded-lg shadow-md">
              <p className="mb-2 text-lg">Síguenos en nuestras redes sociales:</p>
              <ul className="list-none flex space-x-4">
                <li><a href="https://www.instagram.com/tomy.sanchezz" target="_blank" rel="noopener noreferrer" className="text-yellow-300 text-2xl"><i className="fab fa-instagram"></i></a></li>
                
              </ul>
            </div>
            <div className="mt-6 text-center text-sm text-gray-400">
              <p>© 2024 Servi. Todos los derechos reservados.</p>
            </div>
          </div>
        );
      default:
        return <img src={MainInicio} alt="Inicio" className="h-full w-full" />;
    }
  };

  const handleSalir = () => {
    if (window.confirm("¿Estás seguro que deseas salir? Volverás a tener que iniciar sesión.")) {
      navigate("/login");
    }
  };

  return (
    <section className="flex bg-blue-900 min-h-screen">
      {/* Barra lateral */}
      <div className="bg-blue-900 text-white w-70 p-8 flex flex-col gap-2 fixed h-full overflow-y-auto">
        <div className="mb-4">
          <img src={Logo3} alt="Icono" className="w-60 h-23 mx-auto rounded-xl" />
        </div>
        <h1 className="text-xl mb-6 text-center">¡Bienvenido!</h1>


        {/* Botones de navegación */}
        <button onClick={() => setShowButton('inicio')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
          <i className="fa-solid fa-house-chimney"></i> Inicio
        </button>
        <button onClick={() => setShowButton('clientes')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
          <i className="fa-solid fa-users"></i> Clientes
        </button>
        <button onClick={() => setShowButton('productos')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
          <i className="fa-solid fa-gas-pump"></i> Productos
        </button>
        <button onClick={() => setShowButton('ventas')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
          <i className="fa-solid fa-money-bill-wave"></i> Ventas
        </button>
        <button onClick={() => setShowButton('detalle_ventas')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
          <i className="fa-solid fa-receipt"></i> Detalle de Ventas
        </button>

        <hr />

        {/* Contenedor para los botones de Ayuda y Salir */}
        <div className="mt-auto flex justify-between">
          <button onClick={() => setShowButton('ayuda')} className="text-yellow-400 font-bold mb-4">
            Ayuda
          </button>

          <button onClick={handleSalir} className="text-red-700 font-bold mb-4">
            Salir
          </button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 bg-blue-700 ml-80 overflow-y-auto">
        {Opciones()}
      </div>
    </section>
  );
}

export default MenuPrincipal;
