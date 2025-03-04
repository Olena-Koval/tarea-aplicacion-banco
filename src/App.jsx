import { useState } from 'react';
import './App.css';
import Welcome from './Welcome/Welcome';
import Login from './Login/Login';
import Balance from './Balance/Balance';
import Movements from './Movements/Movements';
import Summary from './Summary/Summary';
import accounts from './cuentas'; // Suponiendo que tienes una lista de cuentas

function App() {
  // Estado para las cuentas (lista completa de cuentas)
  const [cuentas, setCuentas] = useState(accounts);
  
  // Estado para la cuenta seleccionada (usuario autenticado)
  const [account, setAccount] = useState(null);

  // Función para manejar el inicio de sesión
  const handleLogin = (user, pin) => {
    const currentAccount = cuentas.find(
      acc => acc.username === user && acc.pin === Number(pin)
    );

    if (currentAccount) setAccount(currentAccount);
  };

  return (
    <>
      <nav>
        <Welcome account={account} />
        <img src="logo.png" alt="Logo" className="logo" />
        <Login onLogin={handleLogin} />
      </nav>

      {account && (
        <main className="app">
          {/* BALANCE */}
          <Balance movements={account.movements} />
          
          {/* MOVEMENTS */}
          <Movements 
            movements={account.movements} 
            cuentas={cuentas} 
            setCuentas={setCuentas} 
          />
          
          {/* SUMMARY */}
          <Summary movements={account.movements} />

          {/* OPERATION: TRANSFER */}
          <div className="operation operation--transfer">
            <h2>Transfer money</h2>
            <form className="form form--transfer">
              <input type="text" className="form__input form__input--to" />
              <input type="number" className="form__input form__input--amount" />
              <button className="form__btn form__btn--transfer">&rarr;</button>
              <label className="form__label">Transfer to</label>
              <label className="form__label">Amount</label>
            </form>
          </div>

          {/* OPERATION: LOAN */}
          <div className="operation operation--loan">
            <h2>Request loan</h2>
            <form className="form form--loan">
              <input type="number" className="form__input form__input--loan-amount" />
              <button className="form__btn form__btn--loan">&rarr;</button>
              <label className="form__label form__label--loan">Amount</label>
            </form>
          </div>

          {/* OPERATION: CLOSE */}
          <div className="operation operation--close">
            <h2>Close account</h2>
            <form className="form form--close">
              <input type="text" className="form__input form__input--user" />
              <input
                type="password"
                maxLength="6"
                className="form__input form__input--pin"
              />
              <button className="form__btn form__btn--close">&rarr;</button>
              <label className="form__label">Confirm user</label>
              <label className="form__label">Confirm PIN</label>
            </form>
          </div>

          {/* LOGOUT TIMER */}
          <p className="logout-timer">
            You will be logged out in <span className="timer">05:00</span>
          </p>
        </main>
      )}
    </>
  );
}

export default App;
