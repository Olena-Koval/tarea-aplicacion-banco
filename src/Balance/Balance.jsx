import React, { useState } from 'react';
import './Balance.css'; // Si tienes estilos específicos para Balance

const Balance = ({ movements, cuentas, setCuentas }) => {
    // Calcular el saldo total de los movimientos
    const balance = movements.reduce((acc, movement) => acc + movement, 0);

    // Función para solicitar un préstamo
    const solicitarPrestamo = (id, monto) => {
        // Buscar la cuenta correspondiente
        const cuenta = cuentas.find(c => c.id === id);
        if (!cuenta) {
            alert("Cuenta no encontrada");
            return;
        }

        // Validar que el monto sea positivo y no mayor al 200% del saldo
        if (monto <= 0 || monto > cuenta.saldo * 2) {
            alert("Monto inválido para préstamo");
            return;
        }

        // Si es válido, agregar el monto del préstamo al saldo de la cuenta
        cuenta.saldo += monto;

        // Actualizar el estado de las cuentas
        setCuentas([...cuentas]);
        alert(`Préstamo de €${monto} aprobado.`);
    };

    return (
        <div className="balance">
            <div>
                <p className="balance__label">Current balance</p>
                <p className="balance__date">
                    As of <span className="date">05/03/2037</span>
                </p>
            </div>
            <p className="balance__value">{balance.toFixed(2)}€</p>

            {/* Formulario para solicitar préstamo */}
            <div className="loan-request">
                <h3>Solicitar Préstamo</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        // Obtener los datos del formulario
                        const cuentaId = parseInt(e.target.cuentaId.value);
                        const monto = parseFloat(e.target.monto.value);

                        // Llamar a la función de solicitud de préstamo
                        solicitarPrestamo(cuentaId, monto);
                    }}
                >
                    <div>
                        <label htmlFor="cuentaId">ID de la cuenta:</label>
                        <input type="number" name="cuentaId" id="cuentaId" required />
                    </div>
                    <div>
                        <label htmlFor="monto">Monto del préstamo:</label>
                        <input type="number" name="monto" id="monto" required />
                    </div>
                    <button type="submit">Solicitar Préstamo</button>
                </form>
            </div>
        </div>
    );
};

export default Balance;
