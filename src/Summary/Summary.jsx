import React from 'react';
import './Summary.css';

const Summary = ({ movements }) => {
  // Sample summary data
  const totalIn = movements
                    .filter(mov => mov >0)
                    .reduce((acc, mov) => acc + mov, 0);

  const totalOut = movements
                        .filter(mov => mov < 0)
                        .reduce((acc, mov) => acc + mov, 0);

  const interest = totalIn * 0.5;

  //totalInDisplay
  // const totalInDisplay = `${totalIn.toFixed(2)}€`;

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{totalIn.toFixed(2)}€</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{totalOut.toFixed(2)}€</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">{interest.toFixed(2)}€</p>
      <button className="btn--sort">&downarrow; SORT</button>
    </div>
  );
};

export default Summary;