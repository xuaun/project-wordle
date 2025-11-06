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
                <span key={langCode} className="language-item">
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
      {submittedGuesses.map(({ value, foundLanguages, key }) => (
        <p
          key={key}
          className={showLanguage ? "guess language" : "guess"}
        >
          {range(0, wordLength).map((index) => (
            <span
              key={index}
              className={`cell ${value[index].status}`}
            >
              {value[index].letter}
            </span>
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
                  return (
                    <span
                      key={language}
                      className={`round-cell ${
                        foundLanguages.length > 1 &&
                        value.map((item) => item.letter).join("") ===
                          cleanString(answer.word).toUpperCase() &&
                        language === answer.language
                          ? "correct-language"
                          : foundLanguages.length > 1 &&
                            value
                              .map((item) => item.letter)
                              .join("") ===
                              cleanString(
                                answer.word
                              ).toUpperCase() &&
                            language !== answer.language
                          ? "incorrect-language"
                          : foundLanguages.length > 1 &&
                            foundLanguages.includes(answer.language)
                          ? "misplaced-language"
                          : language === answer.language
                          ? "correct-language"
                          : "incorrect-language"
                      }`}
                    >
                      {FlagComponent && (
                        <FlagComponent className="flag-icon" />
                      )}
                      <span
                        className="visually-hidden"
                        lang={language}
                      >
                        {
                          AVAILABLE_LANGUAGES.find(
                            (lang) => lang.code === language
                          )?.name
                        }
                      </span>
                    </span>
                  );
                })}
              </span>
            </div>
          ) : null}
        </p>
      ))}
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
