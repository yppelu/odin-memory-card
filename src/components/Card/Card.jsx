import './Card.css';

export default function Card({ url, description, changeScore }) {
  return (
    <div className="card" onClick={changeScore}>
      <img className="card__image" src={url} alt="Card image" />
      <p className="card__description">{description}</p>
    </div>
  );
}
