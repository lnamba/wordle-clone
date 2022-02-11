import React from 'react';
import './LetterSection.scss'

function LetterTile (props) {
  const { letter, pickLetter, usedLettersMap } = props;

  const addLetter = () => {
    console.log('clicked', letter)
    pickLetter(letter)
  }

  return (
    <div className={`letter ${usedLettersMap[letter]}`} onClick={addLetter}>
      <div>{letter}</div>
    </div>
  )
}

export default LetterTile;