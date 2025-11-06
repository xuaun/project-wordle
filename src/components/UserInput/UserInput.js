import React from "react";

import { checkGuess } from "../../game-helpers";
import {
  validateWord,
  cleanString,
} from "../../services/wordService";
import { range } from "../../utils";

import Keyboard from "../Keyboard";
import AnimatedAlert from "../AnimatedAlert";
import Banner from "../Banner";

function UserInput({
  guess,
  setGuess,
  submittedGuesses,
  setSubmittedGuesses,
  totalGuesses,
  answer,
  inputRef,
  resetActiveIndex,
  allWords,
  wordLength,
}) {
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [isShort, setIsShort] = React.useState(false);

  React.useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (guess.length !== wordLength) {
      setIsShort(true);
      return;
    }

    const foundWords = validateWord(guess, allWords);

    if (foundWords.length === 0) {
      setIsInvalid(true);
      return;
    }

    if (totalGuesses - submittedGuesses.length === 0) {
      return;
    }

    const result = checkGuess(
      guess.toUpperCase(),
      cleanString(answer.word).toUpperCase()
    );

    const nextGuess = {
      value: result,
      foundLanguages: Array.from(
        new Set(foundWords.map((word) => word.language))
      ),
      key: crypto.randomUUID(),
    };

    setSubmittedGuesses((prevGuesses) => [...prevGuesses, nextGuess]);

    if (
      guess.toUpperCase() === cleanString(answer.word).toUpperCase()
    ) {
      setIsCorrect(true);
    }
    setGuess("");
  }

  function handleKeyClick(key) {
    if (submittedGuesses.length >= totalGuesses || isCorrect) {
      return;
    }

    if (key === "ENTER") {
      handleSubmit(new Event("submit"));
      return;
    }

    if (key === "BACKSPACE") {
      setGuess((prev) => prev.slice(0, -1));
      isShort && setIsShort(false);
      return;
    }

    if (guess.length < wordLength) {
      setGuess((prev) => prev + key);
      isShort && setIsShort(false);
    }
  }

  return (
    <>
      <AnimatedAlert show={isShort} className="alert">
        Guess must be {wordLength} letters long
      </AnimatedAlert>
      <AnimatedAlert show={isInvalid} className="alert">
        Not a valid word!
      </AnimatedAlert>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter your guess:</label>
        <input
          ref={inputRef}
          id="guess-input"
          type="text"
          value={guess.toUpperCase()}
          onChange={(event) => {
            setGuess(event.target.value.replace(/[^a-zA-Z]/g, ""));
            isShort && setIsShort(false);
            isInvalid && setIsInvalid(false);
          }}
          onClick={() => {
            resetActiveIndex(guess.length);
          }}
          disabled={
            submittedGuesses.length >= totalGuesses || isCorrect
          }
          placeholder={range(0, wordLength)
            .map(() => `_`)
            .join(" ")}
          style={
            submittedGuesses.length >= totalGuesses || isCorrect
              ? { cursor: "not-allowed" }
              : undefined
          }
          maxLength={wordLength}
        />
      </form>
      <Keyboard
        submittedGuesses={submittedGuesses}
        onKeyClick={handleKeyClick}
      />
      {isCorrect && (
        <Banner
          mood="happy"
          answer={answer.word.toUpperCase()}
          language={answer.language}
          submittedGuesses={submittedGuesses}
        />
      )}
      {!isCorrect && submittedGuesses.length >= totalGuesses && (
        <Banner
          mood="sad"
          answer={answer.word.toUpperCase()}
          language={answer.language}
          submittedGuesses={submittedGuesses}
        />
      )}
    </>
  );
}

export default UserInput;
