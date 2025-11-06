import React from "react";

import {
  AVAILABLE_LANGUAGES,
  cleanString,
} from "../../services/wordService";
import { FLAG_COMPONENTS } from "../../constants";

import { range } from "../../utils";
import FlagBanner from "../FlagBanner";

function Guesses({
  guess,
  submittedGuesses,
  totalGuesses,
  inputRef,
  activeIndex,
  setActiveIndex,
  wordLength,
  selectedLanguages,
  answer,
  showLanguage,
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
      <FlagBanner selectedLanguages={selectedLanguages} />
      {selectedLanguages.length > 0 && (
        <div className="selected-languages">
          <p>
            Selected Language{selectedLanguages.length > 1 ? "s" : ""}
            :{" "}
            {selectedLanguages.map((langCode, index) => {
              const language = AVAILABLE_LANGUAGES.find(
                (lang) => lang.code === langCode
              );
              const FlagComponent = FLAG_COMPONENTS[langCode];

              return (
                <span
                  key={langCode}
                  className="language-item"
                  lang={langCode}
                >
                  {FlagComponent && (
                    <FlagComponent className="flag-icon" />
                  )}
                  {`${language?.name || langCode}${
                    index < selectedLanguages.length - 1 ? ", " : ""
                  }`}
                </span>
              );
            })}
          </p>
        </div>
      )}
      {submittedGuesses.map(
        ({ value, foundLanguages, key }, index) => (
          <React.Fragment key={key}>
            <span className="visually-hidden">{`${submittedGuesses.length} guesses submitted of ${totalGuesses}`}</span>
            <p className={showLanguage ? "guess language" : "guess"}>
              <span className="visually-hidden">
                {` ${
                  index === 0
                    ? "First"
                    : index === 1
                    ? "Second"
                    : index === 2
                    ? "Third"
                    : index === 3
                    ? "Fourth"
                    : index === 4
                    ? "Fifth"
                    : "Sixth"
                } Guess: ${value
                  .map((item) => item.letter)
                  .join("")} has ${
                  value.filter((item) => item.status === "correct")
                    .length
                } correct ${
                  value.filter((item) => item.status === "correct")
                    .length >= 2
                    ? "letters"
                    : "letter"
                } and ${
                  value.filter((item) => item.status === "misplaced")
                    .length
                } misplaced ${
                  value.filter((item) => item.status === "misplaced")
                    .length >= 2
                    ? "letters"
                    : "letter"
                }`}{" "}
                <br />
              </span>
              {range(0, wordLength).map((index) => (
                <>
                  <span
                    key={index}
                    className={`cell ${value[index].status}`}
                  >
                    <span aria-hidden="true">
                      {value[index].letter}
                    </span>
                  </span>
                  <span className="visually-hidden">
                    {`Letter ${value[index].letter} is ${value[index].status}`}{" "}
                    <br />
                  </span>
                </>
              ))}
              {showLanguage && foundLanguages.length > 0 ? (
                <div className="languages-wrapper">
                  <span
                    className={`found-languages ${
                      value.map((item) => item.letter).join("") ===
                      cleanString(answer.word).toUpperCase()
                        ? ""
                        : foundLanguages.includes(answer.language) &&
                          foundLanguages.length > 1
                        ? "misplaced"
                        : ""
                    }`}
                  >
                    {foundLanguages.map((language) => {
                      const FlagComponent = FLAG_COMPONENTS[language];
                      const guessedWord = value
                        .map((item) => item.letter)
                        .join("");
                      const isCorrectWord =
                        guessedWord ===
                        cleanString(answer.word).toUpperCase();
                      const isMultipleLanguages =
                        foundLanguages.length > 1;

                      let languageStatus;
                      if (
                        isMultipleLanguages &&
                        isCorrectWord &&
                        language === answer.language
                      ) {
                        languageStatus = "correct";
                      } else if (
                        isMultipleLanguages &&
                        isCorrectWord &&
                        language !== answer.language
                      ) {
                        languageStatus = "incorrect";
                      } else if (
                        isMultipleLanguages &&
                        foundLanguages.includes(answer.language)
                      ) {
                        languageStatus =
                          "one of the correct languages";
                      } else if (
                        !isMultipleLanguages &&
                        language === answer.language
                      ) {
                        languageStatus = "correct";
                      } else if (
                        !isMultipleLanguages &&
                        language !== answer.language
                      ) {
                        languageStatus = "incorrect";
                      }

                      const classNameMap = {
                        correct: "correct-language",
                        incorrect: "incorrect-language",
                        "one of the correct languages":
                          "misplaced-language",
                      };

                      return (
                        <span
                          key={language}
                          className={`round-cell ${classNameMap[languageStatus]}`}
                        >
                          {FlagComponent && (
                            <FlagComponent className="flag-icon" />
                          )}
                          <span
                            className="visually-hidden"
                            lang={language}
                          >
                            {`${
                              AVAILABLE_LANGUAGES.find(
                                (lang) => lang.code === language
                              )?.name
                            } `}
                          </span>
                          <span className="visually-hidden">
                            {`is ${languageStatus}`}{" "}
                          </span>
                        </span>
                      );
                    })}
                  </span>
                </div>
              ) : null}
            </p>
          </React.Fragment>
        )
      )}
      {submittedGuesses.length < totalGuesses && (
        <p className={showLanguage ? "guess language" : "guess"}>
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
          <p
            key={index}
            className={showLanguage ? "guess language" : "guess"}
          >
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
