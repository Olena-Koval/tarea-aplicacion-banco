// cuentas.js
import { faker } from "@faker-js/faker"; // Importamos Faker.js

// Función para generar una cuenta aleatoria
const generarCuenta = () => {
  return {
    id: faker.string.uuid(),  // Generamos un ID único para cada cuenta
    owner: faker.person.fullName(),  // Generamos un nombre completo aleatorio
    movements: Array.from({ length: 8 }, () => faker.finance.amount(-1000, 5000, 2)),  // Generamos 8 movimientos aleatorios (positivos y negativos)
    interestRate: faker.number.float({ min: 0.5, max: 5, precision: 0.1 }),  // Generamos una tasa de interés aleatoria
    pin: faker.number.int({ min: 1000, max: 9999 }),  // Generamos un PIN aleatorio de 4 dígitos
  };
};

// Generamos un array de cuentas (por ejemplo, 4 cuentas)
const cuentas = Array.from({ length: 4 }, generarCuenta); // Generamos 4 cuentas aleatorias

// Función para crear usernames a partir del nombre del propietario
const createUsernames = (accounts) => {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((name) => name[0])
      .join('');
  });
};

// Crear usernames para las cuentas generadas
createUsernames(cuentas);

export default cuentas;  // Exportamos las cuentas generadas para usarlas en otros archivos
