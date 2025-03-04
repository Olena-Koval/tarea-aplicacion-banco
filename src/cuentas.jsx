import React, { useState } from 'react';

const Cuentas = () => {
  // Lista de cuentas de ejemplo, normalmente vendría de una API o de un estado global
  const [cuentas, setCuentas] = useState([
    { id: 1, nombre: "Cuenta A" },
    { id: 2, nombre: "Cuenta B" },
    { id: 3, nombre: "Cuenta C" }
  ]);

  // Función para cerrar una cuenta
  const cerrarCuenta = (id) => {
    // Actualiza el estado de las cuentas, eliminando la cuenta que coincide con el id
    setCuentas(cuentas.filter(cuenta => cuenta.id !== id));
  };

  return (
    <div>
      <h1>Mis Cuentas</h1>
      <ul>
        {cuentas.map(cuenta => (
          <li key={cuenta.id}>
            {cuenta.nombre}
            <button onClick={() => cerrarCuenta(cuenta.id)}>Cerrar Cuenta</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuentas;
