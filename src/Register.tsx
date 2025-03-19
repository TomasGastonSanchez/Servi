import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    const response = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      navigate('/login');
    } else {
      setError('Hubo un problema al registrar el usuario');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="bg-blue-800 p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-yellow-300 text-3xl font-bold mb-4">Registrarse</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-lg bg-blue-700 text-white focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-yellow-300 text-blue-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-400 transition duration-200"
        >
          Crear Cuenta
        </button>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 w-full text-yellow-300 hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

export default Register;
