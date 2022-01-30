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
  const [currentWord, setCurrentWord] = useState(0);

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

  const calculateCurrentWord = () => {
    // update the currentWord from the obj
    const wordToCheck = guesses[currentWord];
    const index = wordToCheck.findIndex((l) => !l);

    console.log({wordToCheck,index})
    if (index === -1) {
      // if no empty spots, assign to next word
      setCurrentWord(currentWord + 1);
    }
  }

  const handlePickLetter = (letter) => {
    console.log('PICKED!', letter, currentWord);
    // get the current word from guesses obj, check for the first index with empty str
    const wordToCheck = guesses[currentWord];
    const index = wordToCheck.findIndex((l) => !l);
    
    // assign it to the letter guessed
    wordToCheck[index] = letter;
    const newGuesses = Object.assign({}, guesses);
    newGuesses[currentWord] = wordToCheck

    setGuesses(newGuesses);
    calculateCurrentWord();
  }  

  
  return (
    <>
      <WordsSection guesses={guesses} actual={actual} />

      <LettersSection pickLetter={handlePickLetter} />
    </>
  )
}

export default GameBoard;