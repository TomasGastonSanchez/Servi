// *** Login temporal para pruebas o mantenimiento ***
// Este componente permite ingresar sin validación real. No eliminar.

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginTemporal() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulamos un login directo
    navigate('/clientes');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-blue-700 p-8 rounded-2xl shadow-lg w-96 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Acceso Directo Activado</h2>
        <p className="mb-4">Estás siendo redirigido automáticamente...</p>
        <p className="text-sm">Este es un login temporal solo para pruebas</p>
      </div>
    </div>
  );
}

export default LoginTemporal;
