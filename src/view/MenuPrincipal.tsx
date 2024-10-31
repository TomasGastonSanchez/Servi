import { useState } from "react";
import Logo3 from '../galery/Logo3.png';
import MainInicio from '../galery/MainInicio.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Productos from "./Tablas/Productos";
import Clientes from './Tablas/Clientes';
import Ventas from './Tablas/Ventas';
import { useNavigate } from "react-router-dom";




function MenuPrincipal() {
  //const [showNavbar, setShowNavbar] = useState(false);
  const [showButton, setShowButton] = useState<string | null>(null);
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const Opciones = () => {
    switch (showButton) {
      case 'clientes':
        return <Clientes/>;
      case 'productos':
        return <Productos/>;
      case 'ventas':
        return <Ventas/>;
      default:
        return <img src={MainInicio} alt="Inicio" className="h-full w-full" />;
  }
  
}
  const handleSalir= () => {
    if (window.confirm("¿Estas seguro que deseas salir? Volverás a tener que iniciar sesión")){
    navigate("/login");
  }
}


  return (
    <section className="h-screen flex">

      {/* Barra lateral */}
      <div className="bg-blue-900 text-white w-70 p-8 flex flex-col gap-2">
        <div className="mb-4">
          <img src={Logo3} alt="Icono" className="w-60 h-23 mx-auto rounded-xl" />
        </div>
        <h1 className="text-xl mb-6 text-center">¡Bienvenido!</h1>



        {/* Botones de navegación */}
          <button onClick={() => setShowButton('inicio')}className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-house-chimney"></i> Inicio
          </button>
          <button onClick={() => setShowButton('clientes')}className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-users"></i> Clientes
          </button>
          <button onClick={() => setShowButton('productos')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-gas-pump"></i> Productos
          </button>
          <button onClick={() => setShowButton('ventas')} className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-money-bill-wave"></i> Ventas
          </button>
          <button onClick={() => setShowButton('')}className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-calendar-week"></i> Detalles de Ventas
          </button>
          <br />
          <hr />

          <button onClick={handleSalir} className="text-red-700 font-bold inline-block w-10">{/* inline ignora la estilizacion del primer div*/}
            Salir
          </button>

          

      </div>

      {/* Contenido principal */}
      <div className=" flex-1 bg-gray-600 ">
        {Opciones()}
      </div>
    </section>
  );
}

export default MenuPrincipal;
