import React from "react";
import { FocusTrap } from "focus-trap-react";
import { FLAG_COMPONENTS } from "../../constants";

function HelpModal({ setShowHelpModal }) {
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    const previouslyFocusedElement = document.activeElement;

    document.body.style.overflow = "hidden";
    document
      .querySelector("header")
      ?.setAttribute("aria-hidden", "true");
    document
      .querySelector(".game-wrapper")
      ?.setAttribute("aria-hidden", "true");

    const closeButton =
      modalRef.current?.querySelector(".modal-close");
    closeButton?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowHelpModal(false);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document
        .querySelector("header")
        ?.setAttribute("aria-hidden", "false");
      document
        .querySelector(".game-wrapper")
        ?.setAttribute("aria-hidden", "false");

      document.removeEventListener("keydown", handleEscape);

      previouslyFocusedElement?.focus();
    };
  }, [setShowHelpModal]);

  const CorrectFlagComponent = FLAG_COMPONENTS["pt-br"];
  const IncorrectFlagComponent = FLAG_COMPONENTS["en"];

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
          >
            <span aria-hidden="true">×</span>
            <span className="visually-hidden">Close help modal</span>
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
            <p>
              Toggle <strong>Show Language Hint</strong> to display if
              the guessed word language matches the answer language,
              which helps you identify the language the word belongs
              to during the game.
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
              <span className="cell correct">
                <span aria-hidden="true">W</span>
                <span className="visually-hidden">
                  letter W in the correct position <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">O</span>
                <span className="visually-hidden">
                  letter O <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">R</span>
                <span className="visually-hidden">
                  letter R <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">L</span>
                <span className="visually-hidden">
                  letter L <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">D</span>
                <span className="visually-hidden">
                  letter D <br />
                </span>
              </span>
            </div>
            <p>
              The letter <span className="cell correct">W</span> is in
              the word and in the correct position.
            </p>
            <div className="example">
              <span className="cell">
                <span aria-hidden="true">M</span>
                <span className="visually-hidden">
                  letter M <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">O</span>
                <span className="visually-hidden">
                  letter O <br />
                </span>
              </span>
              <span className="cell misplaced">
                <span aria-hidden="true">N</span>
                <span className="visually-hidden">
                  letter N is misplaced <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">T</span>
                <span className="visually-hidden">
                  letter T <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">H</span>
                <span className="visually-hidden">
                  letter H <br />
                </span>
              </span>
            </div>
            <p>
              The letter <span className="cell misplaced">N</span> is
              in the word but in a different position.
            </p>
            <div className="example">
              <span className="cell">
                <span aria-hidden="true">S</span>
                <span className="visually-hidden">
                  letter S <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">U</span>
                <span className="visually-hidden">
                  letter U <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">G</span>
                <span className="visually-hidden">
                  letter G <br />
                </span>
              </span>
              <span className="cell incorrect">
                <span aria-hidden="true">A</span>
                <span className="visually-hidden">
                  letter A in the wrong position <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">R</span>
                <span className="visually-hidden">
                  letter R <br />
                </span>
              </span>
            </div>
            <p>
              The letter <span className="cell incorrect">A</span> is
              not in the word.
            </p>
            <p>Words can have repeated letters.</p>
            <br />
            <p>
              If you enabled <strong>Show Language Hint</strong>,
              you'll get feedback on whether your guess's language
              matches the answer's language.
            </p>
            <div className="example">
              <span className="cell">
                <span aria-hidden="true">A</span>
                <span className="visually-hidden">
                  letter A <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">M</span>
                <span className="visually-hidden">
                  letter M <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">O</span>
                <span className="visually-hidden">
                  letter O <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">R</span>
                <span className="visually-hidden">
                  letter R <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">A</span>
                <span className="visually-hidden">
                  letter A <br />
                </span>
              </span>
              <div
                className="languages-wrapper"
                style={{ "--word-length": 2.3 }}
              >
                <span className="found-languages">
                  <span className="round-cell correct-language">
                    <CorrectFlagComponent className="flag-icon" />
                    <span className="visually-hidden" lang="pt-BR">
                      Português
                    </span>
                    <span className="visually-hidden">
                      Correct Language <br />
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <p>
              The guess <strong lang="pt-BR">A M O R A</strong>{" "}
              language
              <span lang="pt-BR">(Português)</span> matches the
              answer's language{" "}
              <span className="flag-example round-cell correct-language">
                <CorrectFlagComponent className="flag-icon" />
              </span>
              .
            </p>
            <div className="example">
              <span className="cell">
                <span aria-hidden="true">L</span>
                <span className="visually-hidden">
                  letter L <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">O</span>
                <span className="visually-hidden">
                  letter O <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">V</span>
                <span className="visually-hidden">
                  letter V <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">E</span>
                <span className="visually-hidden">
                  letter E <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">R</span>
                <span className="visually-hidden">
                  letter R <br />
                </span>
              </span>
              <div
                className="languages-wrapper"
                style={{ "--word-length": 2.3 }}
              >
                <span className="found-languages">
                  <span className="round-cell incorrect-language">
                    <IncorrectFlagComponent className="flag-icon" />
                    <span className="visually-hidden" lang="en">
                      English
                    </span>
                    <span className="visually-hidden">
                      Incorrect Language <br />
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <p>
              The guess <strong>L O V E R</strong> language (English)
              doesn't match the answer's language{" "}
              <span className="flag-example round-cell incorrect-language">
                <IncorrectFlagComponent className="flag-icon" />
              </span>
              .
            </p>
            <div className="example">
              <span className="cell">
                <span aria-hidden="true">M</span>
                <span className="visually-hidden">
                  letter M <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">O</span>
                <span className="visually-hidden">
                  letter O <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">V</span>
                <span className="visually-hidden">
                  letter V <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">E</span>
                <span className="visually-hidden">
                  letter E <br />
                </span>
              </span>
              <span className="cell">
                <span aria-hidden="true">R</span>
                <span className="visually-hidden">
                  letter R <br />
                </span>
              </span>
              <div
                className="languages-wrapper"
                style={{ "--word-length": 2.3 }}
              >
                <span className="found-languages misplaced">
                  <span className="visually-hidden">
                    One of the guess is the correct language
                  </span>
                  <span className="round-cell misplaced-language">
                    <CorrectFlagComponent className="flag-icon" />
                    <span className="visually-hidden" lang="pt-BR">
                      Português
                    </span>
                  </span>
                  <span className="round-cell misplaced-language">
                    <IncorrectFlagComponent className="flag-icon" />
                    <span className="visually-hidden" lang="en">
                      English <br />
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <p>
              One of the guess <strong>M O V E R</strong> possible
              languages (<span lang="pt-BR">Português</span> and{" "}
              <span lang="en">English</span>) matches the answer's
              language{" "}
              <span className="flag-example round-cell misplaced-language">
                <CorrectFlagComponent className="flag-icon" />
              </span>
              .
            </p>
            <br />
            <p>A new word appears every page reload.</p>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default HelpModal;
