import React from 'react';
import './LetterSection.css'

function LetterTile (props) {
  const { letter, pickLetter } = props;

  const addLetter = () => {
    console.log('clicked', letter)
    pickLetter(letter)
  }

  return (
    <div className="letter" onClick={addLetter}>
      <div>{letter}</div>
    </div>
  )
}

export default LetterTile;