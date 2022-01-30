import React from 'react';
import './WordsSection.css'

function WordsSection (props) {
  const { actual, guesses } = props;
  console.log({ actual, guesses })

  const renderLetter = (letter, i) => {
    return (
      <div key={i} className='guessed'>{letter}</div>
    )
  }

  const mapWord = (guess, i) => {
    console.log({guess})
    return (
      <div key={i} className="word-container">
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