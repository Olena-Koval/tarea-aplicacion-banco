import React, { useState } from 'react';
import './Movements.css';

const Movements = ({ movements: rawMovements, cuentas, setCuentas }) => {
  // Estado para almacenar los movimientos procesados como objetos con fecha
  const [movements, setMovements] = useState(
    rawMovements.map((movement, index) => ({
      id: index + 1,  // Asignamos un ID único a cada movimiento (usamos el índice + 1)
      tipo: movement < 0 ? 'withdrawal' : 'deposit',  // Si es negativo es retiro, si es positivo es depósito
      monto: movement,
      fecha: new Date()  // La fecha es la actual
    }))
  );

  // Función para transferir dinero entre cuentas
  const transferirDinero = (origenId, destinoId, monto) => {
    if (monto <= 0) return alert("La cantidad debe ser positiva");

    // Buscar las cuentas origen y destino
    const cuentaOrigen = cuentas.find(c => c.id === origenId);
    const cuentaDestino = cuentas.find(c => c.id === destinoId);

    // Verificar si la cuenta destino existe
    if (!cuentaDestino) return alert("La cuenta destino no existe");

    // Verificar si el saldo de la cuenta origen es suficiente
    if (cuentaOrigen.saldo < monto) return alert("Fondos insuficientes");

    // Realizar la transferencia
    cuentaOrigen.saldo -= monto;
    cuentaDestino.saldo += monto;

    // Actualizar el estado de las cuentas
    setCuentas([...cuentas]);

    // Agregar el movimiento de transferencia al historial
    const newMovement = {
      id: movements.length + 1, // ID único basado en la longitud del array de movimientos
      tipo: 'transferencia',
      monto: -monto,  // El movimiento de salida es negativo
      fecha: new Date()
    };

    setMovements([...movements, newMovement]);
    alert(`Transferencia de $${monto} realizada con éxito`);
  };

  return (
    <div className="movements">
      <h2>Movimientos</h2>
      {movements.map((movement, index) => (
        <div key={movement.id} className="movements__row">
          <div className={`movements__type movements__type--${movement.tipo}`}>
            {movement.tipo === 'deposit' ? 'Depósito' : movement.tipo === 'withdrawal' ? 'Retiro' : 'Transferencia'}
          </div>
          <div className="movements__date">{movement.fecha.toLocaleString()}</div> {/* Mostrar fecha en formato local */}
          <div className="movements__value">{movement.monto}</div>
        </div>
      ))}

      {/* Formulario para hacer una transferencia */}
      <div className="transfer">
        <h3>Realizar Transferencia</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const origenId = parseInt(e.target.origenId.value);
            const destinoId = parseInt(e.target.destinoId.value);
            const monto = parseFloat(e.target.monto.value);

            transferirDinero(origenId, destinoId, monto);
          }}
        >
          <div>
            <label htmlFor="origenId">Cuenta Origen (ID):</label>
            <input type="number" name="origenId" id="origenId" required />
          </div>
          <div>
            <label htmlFor="destinoId">Cuenta Destino (ID):</label>
            <input type="number" name="destinoId" id="destinoId" required />
          </div>
          <div>
            <label htmlFor="monto">Monto a Transferir:</label>
            <input type="number" name="monto" id="monto" required />
          </div>
          <button type="submit">Transferir</button>
        </form>
      </div>
    </div>
  );
};

export default Movements;
