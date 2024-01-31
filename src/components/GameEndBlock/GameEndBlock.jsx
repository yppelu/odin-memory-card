import './GameEndBlock.css';

export default function GameEndBlock({ description, restartGame, endGame }) {
  return (
    <div className="game-end-block-wrapper">
      <div className="game-end-block">
        <p className="game-end-block__description">{description}</p>
        <button className="game-end-block__close-button" onClick={restartGame}>Restart</button>
        <button className="game-end-block__close-button" onClick={endGame}>Main Menu</button>
      </div>
    </div>
  );
}
