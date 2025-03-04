import './Welcome.css';

function Welcome({ account }) {
  if (!account) return <p className="welcome">Log in to get started</p>;
  const name = account.owner.split(' ')[0];
  return <p className="welcome">Bienvenido, {name}</p>;
}

export default Welcome;