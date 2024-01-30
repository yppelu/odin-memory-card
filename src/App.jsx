import { useState, useEffect } from 'react';

import { options } from './helpers/env.js';

import Header from './components/Header/Header.jsx';
import LoadingBlock from './components/LoadingBlock/LoadingBlock.jsx';
import Help from './components/Help/Help.jsx';
import StartWindow from './components/StartWindow/StartWindow.jsx';
import GameWindow from './components/GameWindow/GameWindow.jsx';

function getNumberOfCards(difficulty) {
  if (difficulty === 'easy') return 6;
  if (difficulty === 'medium') return 10;
  if (difficulty === 'hard') return 15;
}

function App() {
  const [isHelpOpened, setIsHelpOpened] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState({ easy: 0, medium: 0, hard: 0 });

  function handleChangeScore() { setScore(score + 1); }

  useEffect(() => {
    if (score > bestScore[difficulty]) {
      const newBestScore = { ...bestScore };
      newBestScore[difficulty]++;
      setBestScore(newBestScore);
    }
  }, [score, bestScore, difficulty]);

  function handleOpenHelp() { setIsHelpOpened(true); }
  function handleCloseHelp() { setIsHelpOpened(false); }

  function handleStartGame(difficulty) {
    setDifficulty(difficulty);
  }
  function handleEndGame() {
    setDifficulty(null);
    setData(null);
    setIsGameOn(false);
    setScore(0);
  }

  useEffect(() => {
    const numberOfCards = getNumberOfCards(difficulty);
    const url = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCards}&has_breeds=1&api_key=${options['x-api-key']}`;

    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.map(cat => {
        return {
          id: cat.id,
          url: cat.url,
          description: cat.breeds[0].name
        };
      });
      setData(data);
      setIsGameOn(true);
      setIsLoading(false);
    }

    if (difficulty) {
      fetchData();
    }
  }, [difficulty]);

  return (
    <>
      {isHelpOpened ? <Help closeHelp={handleCloseHelp} /> : null}
      <Header isGameOn={isGameOn} endGame={handleEndGame} openHelp={handleOpenHelp} />
      <main className="main">
        {
          isLoading ? <LoadingBlock /> : isGameOn
            ? <GameWindow difficulty={difficulty} data={data} changeScore={handleChangeScore} score={score} bestScore={bestScore[difficulty]} />
            : <StartWindow startGame={handleStartGame} />
        }
      </main>
    </>
  );
}

export default App;
