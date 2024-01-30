import './Help.css';

export default function Help({ closeHelp }) {
  return (
    <div className="help-wrapper">
      <div className="help">
        <h2 className="help__title">The rules:</h2>
        <p className="help__description">
          Your receive a number of cards based on the difficulty you choose.
          Each time a card is clicked, all the cards get shuffled around.
          Each card click adds one point to the score.
          <br />
          You <u>win</u> the game by clicking all the cards once.
          <br />
          You <u>lose</u> the game by clicking one card twice.
        </p>
        <button className="help__close-button" onClick={closeHelp}>Got it!</button>
      </div>
    </div>
  );
}
