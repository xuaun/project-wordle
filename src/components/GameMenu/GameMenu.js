import React from "react";
import LanguageSelector from "../LanguageSelector";

function GameMenu({
  selectedLanguages,
  setSelectedLanguages,
  wordLength,
  setWordLength,
  startNewGame,
  isLoading,
  darkMode,
  setDarkMode,
  reduceMotion,
  setReduceMotion,
  showLanguage,
  setShowLanguage,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    startNewGame();
  };

  return (
    <form className="game-setup" onSubmit={handleSubmit}>
      <LanguageSelector
        selectedLanguages={selectedLanguages}
        onChange={setSelectedLanguages}
        disabled={isLoading}
      />

      <div className="word-length-selector">
        <label htmlFor="word-length-input">
          Word Length (characters):{" "}
          <input
            type="number"
            min="4"
            max="8"
            id="word-length-input"
            value={wordLength}
            onChange={(e) => setWordLength(parseInt(e.target.value))}
            disabled={isLoading}
            name="word-length-input"
          />
        </label>
      </div>

      <div className="language-show-wrapper preferences-section">
        <label
          className="language-show preference-toggle switch"
          htmlFor="language-show-input"
        >
          <input
            type="checkbox"
            id="language-show-input"
            name="language-show-input"
            checked={showLanguage}
            onChange={(e) => setShowLanguage(e.target.checked)}
            disabled={isLoading}
          />
          <span className="slider round"></span>
          Show Language Hints
        </label>
      </div>

      <div className="preferences-section">
        {/* <label className="preference-toggle switch" htmlFor="dark-mode-input">
          <input
            type="checkbox"
            id="dark-mode-input"
            name="dark-mode-input"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            disabled={isLoading}
          />
          <span className="slider round"></span>
          Dark Mode
        </label> */}

        <label
          className="preference-toggle switch"
          htmlFor="reduce-motion-input"
        >
          <input
            type="checkbox"
            id="reduce-motion-input"
            name="reduce-motion-input"
            checked={reduceMotion}
            onChange={(e) => setReduceMotion(e.target.checked)}
            disabled={isLoading}
          />
          <span className="slider round"></span>
          Reduce Motion
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || selectedLanguages.length === 0}
        className="start-game-btn"
        name="start-game-btn"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {isLoading ? "Loading..." : "Start Game"}
      </button>
    </form>
  );
}

export default GameMenu;
