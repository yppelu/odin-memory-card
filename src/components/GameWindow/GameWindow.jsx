import './GameWindow.css';

import Card from '../Card/Card.jsx';

export default function GameWindow({ difficulty, data, changeScore, score, bestScore }) {
  return (
    <div className="game-window">
      <div className="game-window__score-block">
        <p className="game-window__score">Score: {score}</p>
        <p className="game-window__score">Best Score: {bestScore}</p>
      </div>
      <div className={`game-window__game-field ${difficulty}`}>
        {
          data.map(cat =>
            <Card
              key={cat.id}
              url={cat.url}
              description={cat.description}
              changeScore={changeScore}
            />
          )
        }
      </div>
    </div>
  );
}
