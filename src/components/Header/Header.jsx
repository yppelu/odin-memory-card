import './Header.css';

export default function Header({ openHelp }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header__title">Memory Cat</h1>
        <button className="header__help-button" onClick={openHelp}>Help</button>
      </div>
    </header>
  );
}
