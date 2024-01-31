export default function getNumberOfCards(difficulty) {
  if (difficulty === 'easy') return 6;
  if (difficulty === 'medium') return 10;
  if (difficulty === 'hard') return 15;
}
