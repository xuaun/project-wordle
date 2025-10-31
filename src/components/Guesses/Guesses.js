import React from "react";

import AnimatedAlert from "../AnimatedAlert";

import { range } from "../../utils";

function Guesses({
  guess,
  submittedGuesses,
  totalGuesses,
  isShort,
  inputRef,
  activeIndex,
  setActiveIndex,
  wordLength,
}) {
  React.useEffect(() => {
    setActiveIndex(guess.length);
  }, [guess, setActiveIndex]);

  function handleCellClick(index) {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(index, index + 1);
      setActiveIndex(index);
    }
  }

  return (
    <>
      <AnimatedAlert show={isShort} className="alert">
        Guess must be {wordLength} letters long
      </AnimatedAlert>
      {submittedGuesses.map(({ value, key }) => (
        <p key={key} className="guess">
          {range(0, wordLength).map((index) => (
            <span
              key={index}
              className={`cell ${value[index].status}`}
            >
              {value[index].letter}
            </span>
          ))}
        </p>
      ))}
      {
        <p className="guess">
          {range(0, wordLength).map((index) => (
            <span
              key={index}
              className={`cell ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleCellClick(index)}
            >
              {guess.toUpperCase()[index]}
            </span>
          ))}
        </p>
      }
      {range(0, totalGuesses - submittedGuesses.length - 1).map(
        (index) => (
          <p key={index} className="guess">
            {range(0, wordLength).map((cellIndex) => (
              <span key={cellIndex} className="cell"></span>
            ))}
          </p>
        )
      )}
    </>
  );
}

export default Guesses;
