import React from "react";

import { KEYS } from "../../constants";

import "./Keyboard.css";

function Keyboard({ submittedGuesses, onKeyClick }) {
  function getKeyClass(key) {
    let status = "";

    submittedGuesses.forEach(({ value }) => {
      value.forEach((letterObj) => {
        if (letterObj.letter === key) {
          if (letterObj.status === "correct") {
            status = "correct";
          } else if (
            letterObj.status === "misplaced" &&
            status !== "correct"
          ) {
            status = "misplaced";
          } else if (status === "") {
            status = "incorrect";
          }
        }
      });
    });

    return status;
  }

  const handleKeyClick = (key, e) => {
    e.preventDefault();
    if (document.activeElement) {
      document.activeElement.blur();
    }
    onKeyClick(key);
  };

  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div className="key-row" key={rowIndex}>
          {row.map((key) => (
            <div
              className={`key ${getKeyClass(key)} ${
                key === "ENTER" || key === "BACKSPACE"
                  ? "large-key"
                  : ""
              }`}
              key={key}
              onClick={(e) => handleKeyClick(key, e)}
              onTouchStart={(e) => e.preventDefault()}
              style={{ cursor: "pointer" }}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
