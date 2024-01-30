import { useState } from 'react';

import Header from './components/Header/Header.jsx';
import Help from './components/Help/Help.jsx';

function App() {
  const [isHelpOpened, setIsHelpOpened] = useState(false);
  function handleOpenHelp() { setIsHelpOpened(true); }
  function handleCloseHelp() { setIsHelpOpened(false); }

  return (
    <>
      <Header openHelp={handleOpenHelp} />
      {isHelpOpened ? <Help closeHelp={handleCloseHelp} /> : null}
    </>
  );
}

export default App;
