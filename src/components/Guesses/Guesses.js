import React from "react";

import {
  AVAILABLE_LANGUAGES,
  cleanString,
} from "../../services/wordService";
import { FLAG_COMPONENTS } from "../../constants";
import { range } from "../../utils";

import FlagBanner from "../FlagBanner";
import LiveFeedback from "../LiveFeedback";

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
  const [lastGuessFeedback, setLastGuessFeedback] =
    React.useState("");

  const guessRefs = React.useRef({});

  React.useEffect(() => {
    setActiveIndex(guess.length);
  }, [guess, setActiveIndex]);

  React.useEffect(() => {
    if (submittedGuesses.length > 0 && submittedGuesses.length < 6) {
      const lastGuessIndex = submittedGuesses.length - 1;
      const { value: lastGuessValue } =
        submittedGuesses[lastGuessIndex];

      const getOrdinal = (index) => {
        switch (index) {
          case 0:
            return "First";
          case 1:
            return "Second";
          case 2:
            return "Third";
          case 3:
            return "Fourth";
          case 4:
            return "Fifth";
          case 5:
            return "Sixth";
          default:
            return "";
        }
      };

      const correctCount = lastGuessValue.filter(
        (item) => item.status === "correct"
      ).length;
      const misplacedCount = lastGuessValue.filter(
        (item) => item.status === "misplaced"
      ).length;
      const guessedWord = lastGuessValue
        .map((item) => item.letter)
        .join("");

      let feedback = `${getOrdinal(
        lastGuessIndex
      )} Guess: ${guessedWord}. `;
      feedback += `has ${correctCount} correct letter${
        correctCount !== 1 ? "s" : ""
      } and ${misplacedCount} misplaced letter${
        misplacedCount !== 1 ? "s" : ""
      }. Press Alt and ${lastGuessIndex + 1} to focus on this guess.`;

      setLastGuessFeedback(feedback);
    }
  }, [submittedGuesses, showLanguage, answer]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      if (event.altKey && event.key >= "1" && event.key <= "6") {
        const guessIndex = parseInt(event.key, 10) - 1;

        const targetGuess = submittedGuesses[guessIndex];

        if (targetGuess) {
          event.preventDefault();

          const targetRef = guessRefs.current[targetGuess.key];

          if (targetRef) {
            targetRef.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [submittedGuesses]);

  function handleCellClick(index) {
    if (inputRef?.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(index, index + 1);
      setActiveIndex(index);
    }
  }

  return (
    <>
      <LiveFeedback lastGuessFeedback={lastGuessFeedback} />
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
      <span
        className="visually-hidden"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={0}
      >{`${submittedGuesses.length} guesses submitted of ${totalGuesses}`}</span>
      {submittedGuesses.map(
        ({ value, foundLanguages, key }, index) => (
          <p
            key={key}
            ref={(el) => (guessRefs.current[key] = el)}
            tabIndex={-1}
            className={showLanguage ? "guess language" : "guess"}
          >
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
                      languageStatus = "one of the correct languages";
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
