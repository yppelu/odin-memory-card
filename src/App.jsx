import { useState, useEffect } from 'react';

import { options } from './helpers/env.js';
import getNumberOfCards from './helpers/getNumberOfCards.js';

import Header from './components/Header/Header.jsx';
import LoadingBlock from './components/LoadingBlock/LoadingBlock.jsx';
import Help from './components/Help/Help.jsx';
import StartWindow from './components/StartWindow/StartWindow.jsx';
import GameWindow from './components/GameWindow/GameWindow.jsx';
import GameEndBlock from './components/GameEndBlock/GameEndBlock.jsx';

function App() {
  const [isHelpOpened, setIsHelpOpened] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState({ easy: 0, medium: 0, hard: 0 });
  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isRestart, setIsRestart] = useState(false);

  function handleCardClick(card) {
    if (card.clicked) {
      setIsLose(true);
    } else {
      card.clicked = true;
      setScore(score + 1);

      const clicked = data.reduce((clicks, card) => card.clicked ? clicks + 1 : clicks, 0);
      if (clicked === data.length) setIsWin(true);
      else shuffle();
    }
  }

  useEffect(() => {
    if (score > bestScore[difficulty]) {
      const newBestScore = { ...bestScore };
      newBestScore[difficulty]++;
      setBestScore(newBestScore);
    }
  }, [score, bestScore, difficulty]);

  function shuffle() {
    const newCards = [...data];
    newCards.sort(() => Math.random() - 0.5);
    setData(newCards);
  }

  function handleOpenHelp() { setIsHelpOpened(true); }
  function handleCloseHelp() { setIsHelpOpened(false); }

  function handleStartGame(difficulty) { setDifficulty(difficulty); }
  function handleRestartGame() {
    setIsLose(false);
    setIsWin(false);
    setScore(0);
    setIsRestart(!isRestart);
  }
  function handleEndGame() {
    setDifficulty(null);
    setData(null);
    setIsGameOn(false);
    setScore(0);
    setIsLose(false);
    setIsWin(false);
  }

  useEffect(() => {
    const numberOfCards = getNumberOfCards(difficulty);
    const url = `https://api.thecatapi.com/v1/images/search?limit=${numberOfCards}&has_breeds=1&api_key=${options['x-api-key']}`;

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        const data = result.map(cat => {
          return {
            id: cat.id,
            url: cat.url,
            description: cat.breeds[0].name,
            clicked: false
          };
        });
        setData(data);
        setIsGameOn(true);
        setIsLoading(false);
      } catch {
        setData(null);
        setIsGameOn(false);
        setIsLoading(false);
      }
    }

    if (difficulty) {
      fetchData();
    }
  }, [difficulty, isRestart]);

  return (
    <>
      {isHelpOpened ? <Help closeHelp={handleCloseHelp} /> : null}
      <Header isGameOn={isGameOn} endGame={handleEndGame} openHelp={handleOpenHelp} />
      {
        isLose ? <GameEndBlock description="Wrong choice! You lose." restartGame={handleRestartGame} endGame={handleEndGame} /> : null
      }
      {
        isWin ? <GameEndBlock description="That was the last one! You win." endGame={handleEndGame} /> : null
      }
      <main className="main">
        {
          isLoading ? <LoadingBlock /> : isGameOn
            ? <GameWindow difficulty={difficulty} data={data} cardClick={handleCardClick} score={score} bestScore={bestScore[difficulty]} />
            : <StartWindow startGame={handleStartGame} />
        }
      </main>
    </>
  );
}

export default App;
