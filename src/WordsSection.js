import React from 'react';
import './WordsSection.css'

function WordsSection (props) {
  const { actual, guesses } = props;
  console.log({actual, guesses})

  const renderLetter = (letter) => {
    console.log({letter})
    return (
      <div className='guessed'>{letter}</div>
    )
  }

  const mapWord = (guess) => {
    console.log(guesses,guess)
    return (
      <div className="word-container">
        {guess.map(renderLetter)}
      </div>
    )
  }

  return (
    <div className="words-container">
      {Object.values(guesses).map(mapWord)}
    </div>
  )
}

export default WordsSection;