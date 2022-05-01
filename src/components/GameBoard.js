import React, { useCallback, useEffect, useState } from 'react';
import LettersSection from './LettersSection';
import WordsSection from './WordsSection';
import FinishModal from './FinishModal';
import ButtonsSection from './ButtonsSection';

const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function GameBoard () {
  const inital6x6Frame = {
    0: ['','','','',''],
    1: ['','','','',''],
    2: ['','','','',''],
    3: ['','','','',''],
    4: ['','','','',''],
    5: ['','','','',''],
  }
  const [guesses, setGuesses] = useState(inital6x6Frame);
  const [tiles, setTiles] = useState(inital6x6Frame);
  const [actual, setActual] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [usedLettersMap, setUsedLettersMap] = useState({});
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const wordToCheck = guesses[currentWord] || inital6x6Frame[0];
  const index = wordToCheck?.findIndex((l) => !l);
  const stringifiedGuess = wordToCheck.join('');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const returnedWords = await fetchFromJson();
    const randomIndex = Math.floor(Math.random() * returnedWords.length);
    setActual(returnedWords[randomIndex].split(''));
  }

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
    if (index === -1) {
      // if no empty spots, assign to next word
      setCurrentWord(currentWord + 1);
    }
  }

  const checkIfCorrect = () => {
    const isCorrect = wordToCheck.every((letter, i) => actual[i] === letter);
    setIsGuessCorrect(isCorrect);
  }

  const checkIfGameOver = () => {
    const isGameOver = Object.values(guesses).every((word) => word.every((letter) => letter));
    setIsGameOver(isGameOver);
  }

  const isWordValid = async () => {
    const validWordUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${stringifiedGuess.toLowerCase()}`;
    const res = await fetch(validWordUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        app_id: 'd9a0cf07',
        app_key: '97efd8ec12412b7974dab2f70ee8c0f1',
      },
    });
    if (res.status === 404) {
      return false;
    }
    return true;
  }

  const handleGuess = async () => {
    const isValid = await isWordValid();

    if (!isValid) {
      window.alert('Invalid word');
      return;
    } 
    
    if (stringifiedGuess.length < 5) {
      window.alert('Word too short');
      return;
    }
    
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

    const newTiles = Object.assign({}, tiles);
    newTiles[currentWord] = updatedTiles;
    setTiles(newTiles);

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
    const newLetterMap = { ...usedLettersMap, ...letterMap };

    setUsedLettersMap(newLetterMap);
    calculateCurrentWord();
    checkIfCorrect();
    checkIfGameOver();
  }

  const handlePickLetter = (letter) => {
    // get the current word from guesses obj, check for the first index with empty string
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
    } else {
      const newGuesses = Object.assign({}, guesses);
      newGuesses[currentWord] = wordToCheck
      wordToCheck[wordToCheck.length - 1] = '';

      setGuesses(newGuesses);
    }
  }

  const resetGame = () => {
    setGuesses(inital6x6Frame);
    setTiles(inital6x6Frame);
    setActual([]);
    setCurrentWord(0);
    setUsedLettersMap({});
    setIsGuessCorrect(false);
    setIsGameOver(false);
    initializeGame();
  }

  return (
    <>
      <WordsSection guesses={guesses} actual={actual} tiles={tiles} />

      <LettersSection pickLetter={handlePickLetter} usedLettersMap={usedLettersMap} />
   
      <ButtonsSection onGuess={handleGuess} onBackspace={handleBackspace} />
    
      {isGuessCorrect ? (<FinishModal reset={resetGame} result="won" />) : null}
      {isGameOver && !isGuessCorrect ? (<FinishModal reset={resetGame} result="lost" />) : null}
    </>
  )
}

export default GameBoard;