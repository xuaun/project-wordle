import React from "react";

import { AVAILABLE_LANGUAGES } from "../../services/wordService";

function Banner({ mood, answer, language, submittedGuesses }) {
  const bannerRef = React.useRef(null);

  const correctLanguage = AVAILABLE_LANGUAGES.find(
    (lang) => lang.code === language
  );

  React.useEffect(() => {
    if (bannerRef.current) {
      bannerRef.current.focus();
    }
  }, [mood]);

  return (
    <>
      {mood === "happy" && (
        <div
          className="happy banner"
          aria-modal="true"
          role="dialog"
          ref={bannerRef}
          aria-labelledby="bannerTitle"
          aria-describedby="bannerDesc"
          tabIndex={-1}
        >
          <p id="bannerTitle" className="visually-hidden">
            End Game
          </p>
          <p id="bannerDesc">
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
        <div
          className="sad banner"
          aria-modal="true"
          role="dialog"
          ref={bannerRef}
          aria-labelledby="bannerTitle"
          aria-describedby="bannerDesc"
          tabIndex={-1}
        >
          <p id="bannerTitle" className="visually-hidden">
            End Game
          </p>
          <p id="bannerDesc">
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
