// Movements.jsx
import React from 'react';
import './Movements.css';
import moment from 'moment';  // Importamos moment.js

const Movements = ({ movements: rawMovements, cuentas, setCuentas }) => {
  // Mapeo de movimientos para determinar si es un depósito o una retirada
  const movements = rawMovements.map(movement => ({
    value: movement,
    type: movement < 0 ? 'withdrawal' : 'deposit',
    date: moment().subtract(Math.floor(Math.random() * 30), 'days').toDate() // Asignamos una fecha aleatoria en los últimos 30 días
  }));

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
    alert(`Transferencia de $${monto} realizada con éxito`);
  };

  return (
    <div className="movements">
      <h2>Movimientos</h2>
      {movements.map((movement, index) => (
        <div key={index} className="movements__row">
          <div className={`movements__type movements__type--${movement.type}`}>
            {movement.type === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </div>
          <div className="movements__date">
            {/* Usamos moment.js para formatear la fecha */}
            {moment(movement.date).fromNow()}
          </div>
          <div className="movements__value">{movement.value}</div>
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
