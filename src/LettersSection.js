import React from 'react';
import LetterTile from './LetterTile'

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function LettersSection(props) {
  const { pickLetter, onBackspace, onClick, usedLettersMap } = props;

  const renderLetter = (letter) => {
    return (
      <LetterTile letter={letter} key={letter} pickLetter={pickLetter} usedLettersMap={usedLettersMap} />
    )
  }
  
  return (
    <div className="letter-section">
      <button className="button" onClick={onClick}>
        <span>Guess</span>
      </button>

      <div className="letter-container">
        {alphabet.map(renderLetter)}
      </div>

      <button className="button" onClick={onBackspace}>
        <span>Back</span>
      </button>
    </div>
  )
}

export default LettersSection;