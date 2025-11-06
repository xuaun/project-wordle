import React from "react";

import { AVAILABLE_LANGUAGES } from "../../services/wordService";

function Banner({ mood, answer, language, submittedGuesses }) {
  const correctLanguage = AVAILABLE_LANGUAGES.find(
    (lang) => lang.code === language
  );

  return (
    <>
      {mood === "happy" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got{" "}
            <span lang={correctLanguage?.code || language}>
              {answer} ({correctLanguage?.name || language})
            </span>{" "}
            in
            <strong> {submittedGuesses.length} guesses</strong>.
          </p>
          <button onClick={() => window.location.reload()}>
            Play Again
          </button>
        </div>
      )}
      {mood === "sad" && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is{" "}
            <span lang={correctLanguage?.code || language}>
              <strong>{answer}</strong> (
              {correctLanguage?.name || language})
            </span>
            .
          </p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}
    </>
  );
}

export default Banner;
