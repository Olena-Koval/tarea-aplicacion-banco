import './Balance.css'; // If you have specific styles for Balance

const Balance = ({ movements }) => {
    const balance = movements.reduce((acc, movement) => acc + movement, 0);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of <span className="date">05/03/2037</span>
        </p>
      </div>
      <p className="balance__value">{balance.toFixed(2)}€</p>
    </div>
  );
};

export default Balance;