import React from 'react';
import '../styles/LetterSection.scss';

function LetterTile (props) {
  const { letter, pickLetter, usedLettersMap } = props;

  const addLetter = () => {
    pickLetter(letter)
  }

  return (
    <div className={`letter ${usedLettersMap[letter]}`} onClick={addLetter}>
      <h3>{letter}</h3>
    </div>
  )
}

export default LetterTile;