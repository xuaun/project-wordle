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
            <strong>Congratulations!</strong> Got {answer} (
            {correctLanguage?.name || language}) in
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
            Sorry, the correct answer is <strong>{answer}</strong> (
            {correctLanguage?.name || language}).
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
