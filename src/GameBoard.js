import React, { useCallback, useEffect, useState } from 'react';
import LettersSection from './LettersSection';
import WordsSection from './WordsSection';

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function GameBoard () {
  const [guesses, setGuesses] = useState({
    0: ['','','','',''],
    1: ['','','','',''],
    2: ['','','','',''],
    3: ['','','','',''],
    4: ['','','','',''],
    5: ['','','','',''],
  });
  const [tiles, setTiles] = useState({
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
  const [usedLettersMap, setUsedLettersMap] = useState({});
  const wordToCheck = guesses[currentWord];
  const index = wordToCheck.findIndex((l) => !l);

  useEffect(() => {
    const init = async () => {
      const returnedWords = await fetchFromJson()
      const randomIndex = Math.floor(Math.random() * returnedWords.length);
      setWord(returnedWords[randomIndex]);
      setActual(returnedWords[randomIndex].split(''));
    }
   
    init();
  }, []);

  const fetchFromJson = useCallback(async () => {
    const url = 'words.json';
    const res = await fetch(url);
    const data = await res.json();
    return data.words;
  });

  useEffect(() => {
    const letterMap = alphabet.reduce((result, letter) => {
      result[letter] = '';
      return result;
    }, {});

    setUsedLettersMap(letterMap);
  }, []);

  const calculateCurrentWord = () => {
    // update the currentWord from the obj

    console.log({wordToCheck,index})
    if (index === -1) {
      // if no empty spots, assign to next word
      setCurrentWord(currentWord + 1);
    }
  }

  const handleGuess = () => {
    console.log('handleGuess', {actual, guesses,wordToCheck})
    
    const updatedTiles = wordToCheck.reduce((arr, letter, index) => {
      if (letter === actual[index]) {
        arr.push('correct');
      } else if (actual.includes(letter)) {
        arr.push('used');
      } else {
        arr.push('incorrect');
      }
      return arr;
    }, []);

    console.log(updatedTiles, currentWord)
    const newTiles = Object.assign({}, tiles);
    newTiles[currentWord] = updatedTiles;
    setTiles(newTiles);

    // const newLetterMap = Object.assign({}, usedLettersMap);
    // wordToCheck.forEach((letter) => {
    //   if (!newLetterMap[letter]) {
    //     newLetterMap[letter] = true;
    //   }
    // });
    const letterMap = wordToCheck.reduce((result, letter, index) => {
      if (letter === actual[index]) {
        result[letter] = 'correct';
      } else if (actual.includes(letter)) {
        result[letter] = 'used';
      } else {
        result[letter] = 'incorrect';
      }
      return result;
    }, {});
    const newLetterMap = {...usedLettersMap, ...letterMap};
    console.log({letterMap, usedLettersMap, newLetterMap})
    setUsedLettersMap(newLetterMap);
    calculateCurrentWord();
  }

  const handlePickLetter = (letter) => {
    console.log('PICKED!', letter, currentWord);
    // get the current word from guesses obj, check for the first index with empty str
    // assign it to the letter guessed
      wordToCheck[index] = letter;
      const newGuesses = Object.assign({}, guesses);
      newGuesses[currentWord] = wordToCheck
  
      setGuesses(newGuesses);
      if (index > -1 && index < 4) {
        calculateCurrentWord()
      }
  }  

  const handleBackspace = () => {
    if (index > 0) {
      const newGuesses = Object.assign({}, guesses);
      newGuesses[currentWord] = wordToCheck
      wordToCheck[index - 1] = '';

      setGuesses(newGuesses);
    }
  }
  console.log({actual})

  return (
    <>
      <WordsSection guesses={guesses} actual={actual} tiles={tiles} />

      <LettersSection pickLetter={handlePickLetter} usedLettersMap={usedLettersMap} onBackspace={handleBackspace} onClick={handleGuess} />
    </>
  )
}

export default GameBoard;