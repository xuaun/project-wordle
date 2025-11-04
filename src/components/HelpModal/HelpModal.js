import React from "react";
import { FocusTrap } from "focus-trap-react";

function HelpModal({ setShowHelpModal }) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    document
      .querySelector("header")
      .setAttribute("aria-hidden", "true");
    document.body.setAttribute("aria-hidden", "true");
    document
      .querySelector("#helpModal")
      .setAttribute("aria-hidden", "false");
    return () => {
      document.body.style.overflow = "unset";
      document
        .querySelector("header")
        .setAttribute("aria-hidden", "false");
      document.body.setAttribute("aria-hidden", "false");
    };
  }, []);

  return (
    <FocusTrap>
      <div
        className="modal-backdrop"
        onClick={() => setShowHelpModal(false)}
        id="helpModal"
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          aria-modal="true"
          role="dialog"
          aria-labelledby="helpTitle"
          aria-describedby="helpDesc"
        >
          <button
            className="modal-close"
            onClick={() => setShowHelpModal(false)}
            aria-label="close help modal"
          >
            ×
          </button>
          <h2 id="helpTitle">How to Play</h2>
          <div id="helpDesc">
            <h3>In the Menu</h3>
            <p>
              Select which languages you want to use - you can choose
              multiple languages.
            </p>
            <p>
              And choose the length of the word you want to guess,
              ranging from 3 to 10 letters.
            </p>
            <p>And then, Start Game.</p>
            <br />
            <h3>During the Game</h3>
            <p>Guess the word in 6 tries.</p>
            <p>
              Each guess must be a valid word in one of the selected
              languages and must match the length you specified.
            </p>
            <p>
              After each guess, the tiles will show how close you are
              to the solution.
            </p>
            <div className="example">
              <span
                aria-label="letter W correct"
                className="cell correct"
              >
                W
              </span>
              <span aria-label="letter O" className="cell">
                O
              </span>
              <span aria-label="letter R" className="cell">
                R
              </span>
              <span aria-label="letter L" className="cell">
                L
              </span>
              <span aria-label="letter D" className="cell">
                D
              </span>
            </div>
            <p>
              The letter <span className="cell correct">W</span> is in
              the word and in the correct position.
            </p>
            <div className="example">
              <span aria-label="letter M" className="cell">
                M
              </span>
              <span aria-label="letter O" className="cell">
                O
              </span>
              <span
                aria-label="letter N in another position"
                className="cell misplaced"
              >
                N
              </span>
              <span aria-label="letter T" className="cell">
                T
              </span>
              <span aria-label="letter H" className="cell">
                H
              </span>
            </div>
            <p>
              The letter <span className="cell misplaced">N</span> is
              in the word but in a different position.
            </p>
            <div className="example">
              <span aria-label="letter S" className="cell">
                S
              </span>
              <span aria-label="letter U" className="cell">
                U
              </span>
              <span aria-label="letter G" className="cell">
                G
              </span>
              <span
                aria-label="letter A wrong"
                className="cell incorrect"
              >
                A
              </span>
              <span aria-label="letter R" className="cell">
                R
              </span>
            </div>
            <p>
              The letter <span className="cell incorrect">A</span> is
              not in the word.
            </p>
            <p>Words can have repeated letters.</p>
            <br />
            <p>A new word appears every page reload.</p>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default HelpModal;
