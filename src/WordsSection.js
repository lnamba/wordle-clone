import React from 'react';
import './WordsSection.scss'

function WordsSection (props) {
  const { actual, guesses, tiles } = props;

  const renderLetter = (letter, i, letterTiles) => {
    return (
      <span key={i} className={`guessed ${letter ? letterTiles : null}`}>{letter}</span>
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