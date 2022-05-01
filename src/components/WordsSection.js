import React from 'react';
import '../styles/WordsSection.scss';

function WordsSection (props) {
  const { guesses, tiles } = props;

  const renderLetter = (letter, i, letterTiles) => {
    return (
      <h3 key={i} className={`guessed ${letter ? letterTiles : null}`}>{letter}</h3>
    )
  }

  const mapWord = (guess, i, wordTiles) => {
    return (
      <div key={i} className="word-container">
        {guess.map((letter, i) => renderLetter(letter, i, wordTiles[i]))}
      </div>
    )
  }

  return (
    <div className="words-container">
      {Object.values(guesses).map((word, i) => mapWord(word, i, tiles[i]))}
    </div>
  )
}

export default WordsSection;