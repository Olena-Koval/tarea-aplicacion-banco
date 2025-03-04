// Cuentas.jsx
import React, { useState } from 'react';
import cuentas from './cuentas';  // Importamos las cuentas generadas aleatoriamente

const Cuentas = () => {
  const [cuentasList, setCuentasList] = useState(cuentas); // Inicializamos el estado con las cuentas importadas

  // Función para cerrar una cuenta
  const cerrarCuenta = (id) => {
    // Actualizamos el estado de las cuentas, eliminando la cuenta que coincide con el id
    setCuentasList(cuentasList.filter(cuenta => cuenta.id !== id));
  };

  return (
    <div>
      <h1>Mis Cuentas</h1>
      <ul>
        {cuentasList.map(cuenta => (
          <li key={cuenta.id}>
            {cuenta.owner} (ID: {cuenta.id}) - Saldo: ${cuenta.movements.reduce((acc, mov) => acc + parseFloat(mov), 0).toFixed(2)}  {/* Calculamos el saldo sumando todos los movimientos */}
            <button onClick={() => cerrarCuenta(cuenta.id)}>Cerrar Cuenta</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cuentas;
