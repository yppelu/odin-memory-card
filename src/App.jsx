import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import Help from './components/Help/Help.jsx';
import StartWindow from './components/StartWindow/StartWindow.jsx';

function App() {
  const [isHelpOpened, setIsHelpOpened] = useState(false);
  function handleOpenHelp() { setIsHelpOpened(true); }
  function handleCloseHelp() { setIsHelpOpened(false); }

  const [isGameOn, setIsGameOn] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  function handleStartGame(difficulty) {
    setDifficulty(difficulty);
    setIsGameOn(true);
  }
  function handleEndGame() {
    setIsGameOn(false);
    setDifficulty(null);
  }

  return (
    <>
      {isHelpOpened ? <Help closeHelp={handleCloseHelp} /> : null}
      <Header openHelp={handleOpenHelp} />
      <main className="main">
        <StartWindow startGame={handleStartGame} />
      </main>
    </>
  );
}

export default App;
