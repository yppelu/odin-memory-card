import './Card.css';

export default function Card({ cat, cardClick }) {
  return (
    <div className="card" onClick={() => cardClick(cat)}>
      <img className="card__image" src={cat.url} alt="Card image" />
      <p className="card__description">{cat.description}</p>
    </div>
  );
}
