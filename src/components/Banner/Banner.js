import React from "react";

function Banner({ mood, answer, submittedGuesses }) {
  return (
    <>
      {mood === "happy" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got {answer} in
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
            Sorry, the correct answer is <strong>{answer}</strong>.
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
