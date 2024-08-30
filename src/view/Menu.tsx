import { useState } from "react";
import Logo3 from '../galery/Logo3.png';
import MainInicio from '../galery/MainInicio.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';

function MenuPrincipal() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleOpenNavbar = () => setShowNavbar(true);
  const handleCloseNavbar = () => setShowNavbar(false);

  return (
    <section className="h-screen flex">



      {/* Barra lateral */}
      <div className="bg-blue-900 text-white w-70 p-8 flex flex-col gap-2">
        <div className="mb-4">
          <img src={Logo3} alt="Icono" className="w-60 h-40 mx-auto rounded-xl" />
        </div>
        <h1 className="text-xl mb-6 text-center">¡Bienvenido!</h1>



        {/* Botones de navegación */}
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-house-chimney"></i> Inicio
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-users"></i> Clientes
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-gas-pump"></i> Productos
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-money-bill-wave"></i> Ventas
          </button>
          <button className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-3xl mb-2 text-left">
            <i className="fa-solid fa-calendar-week"></i> Detalles de Ventas
          </button>
          <hr />

          <button className="text-red-700 font-bold inline-block w-10">{/* inline ignora la estilizacion del primer div*/}
            Salir
          </button>

          

      </div>

      {/* Contenido principal */}
      <div className=" flex-1 bg-gray-600 ">
        <img src={MainInicio} alt="Inicio" className="h-full w-full"/>
        <h1 className="">{/*hola*/}</h1>
        
        
      </div>
    </section>
  );
}

export default MenuPrincipal;
