import './Header.css';

export default function Header({ isGameOn, endGame, openHelp }) {
  return (
    <header className="header">
      <div className="header-content">
        {
          isGameOn
            ? <button className="header__nav-button" onClick={endGame}>Back</button>
            : null
        }
        <h1 className="header__title">Memory Cat</h1>
        <button className="header__nav-button" onClick={openHelp}>Help</button>
      </div>
    </header>
  );
}
