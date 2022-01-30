import React, { useCallback, useEffect, useState } from 'react';
import LettersSection from './LettersSection';
import WordsSection from './WordsSection';

function GameBoard () {
  const [guesses, setGuesses] = useState({
    0: ['','','','',''],
    1: ['','','','',''],
    2: ['','','','',''],
    3: ['','','','',''],
    4: ['','','','',''],
    5: ['','','','',''],
  });
  const [actual, setActual] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    const init = async () => {
      const returnedWords = await fetchFromJson()
      const randomIndex = Math.floor(Math.random() * returnedWords.length);
      setWord(returnedWords[randomIndex]);
      setActual(returnedWords[randomIndex].split(''));
    }
   
    init();
  }, [])

  const fetchFromJson = useCallback(async () => {
    const url = 'words.json';
    const res = await fetch(url);
    const data = await res.json();
    return data.words;
  })

  const handlePickLetter = (letter) => {
    console.log('PICKED!', letter)
  }  
  
  return (
    <>
      <WordsSection guesses={guesses} actual={actual} />

      <LettersSection pickLetter={handlePickLetter} />
    </>
  )
}

export default GameBoard;