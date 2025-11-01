import React from "react";

import { AVAILABLE_LANGUAGES } from "../../services/wordService";
import { FLAG_COMPONENTS } from "../../constants";

import { range } from "../../utils";

function Guesses({
  guess,
  submittedGuesses,
  totalGuesses,
  inputRef,
  activeIndex,
  setActiveIndex,
  wordLength,
  selectedLanguages,
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
      {selectedLanguages.length > 0 && (
        <div className="selected-languages">
          <p>
            Selected Language{selectedLanguages.length > 1 ? "s" : ""}
            :{" "}
          </p>
          {selectedLanguages.map((langCode, index) => {
            const language = AVAILABLE_LANGUAGES.find(
              (lang) => lang.code === langCode
            );
            const FlagComponent = FLAG_COMPONENTS[langCode];

            return (
              <span key={langCode} className="language-item">
                {index > 0 && ", "}
                {FlagComponent && (
                  <FlagComponent className="flag-icon" />
                )}
                {language?.name || langCode}
              </span>
            );
          })}
        </div>
      )}
      {submittedGuesses.length < totalGuesses && (
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
      )}
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
