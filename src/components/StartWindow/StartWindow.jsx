import './StartWindow.css';

export default function StartWindow({ startGame }) {
  return (
    <div className="start-window">
      <button
        className="start-window__start-button"
        onClick={() => startGame('easy')}
      >
        Easy
      </button>
      <button
        className="start-window__start-button"
        onClick={() => startGame('medium')}
      >
        Medium
      </button>
      <button
        className="start-window__start-button"
        onClick={() => startGame('hard')}
      >
        Hard
      </button>
    </div>
  );
}
