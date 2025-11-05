import React from "react";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { newWord, wordDatabase } from "../../services/wordService";
import { useUserPreferences } from "../../hooks/useUserPreferences";

import UserInput from "../UserInput";
import Guesses from "../Guesses";
import GameMenu from "../GameMenu";

function Game() {
  const [guess, setGuess] = React.useState("");
  const [submittedGuesses, setSubmittedGuesses] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [preferences, updatePreference] = useUserPreferences();

  const [answer, setAnswer] = React.useState(null);
  const [allWords, setAllWords] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  const inputRef = React.useRef(null);

  const startNewGame = React.useCallback(async () => {
    if (preferences.selectedLanguages.length === 0) {
      alert("Selecione pelo menos um idioma!");
      return;
    }

    // console.log("🎮 Iniciando novo jogo...");
    // console.log(
    //   "Idiomas selecionados:",
    //   preferences.selectedLanguages
    // );
    // console.log("Tamanho da palavra:", preferences.wordLength);

    setIsLoading(true);
    setGameStarted(false);

    try {
      const [drawnWord, database] = await Promise.all([
        newWord(
          preferences.selectedLanguages,
          preferences.wordLength
        ),
        wordDatabase(
          preferences.selectedLanguages,
          preferences.wordLength
        ),
      ]);

      // console.log("📥 Dados recebidos:");
      // console.log("Palavra sorteada:", drawnWord);
      // console.log("Tamanho do dicionário:", database?.length);

      if (drawnWord) {
        setAnswer(drawnWord);
        setAllWords(database);
        setSubmittedGuesses([]);
        setGuess("");
        setActiveIndex(0);
        setGameStarted(true);

        // console.log("✅ Jogo iniciado com sucesso!");
        // console.log(
        //   "Resposta:",
        //   drawnWord.word,
        //   "| Idioma:",
        //   drawnWord.language
        // );
      } else {
        console.error("❌ Palavra sorteada é null/undefined");
        alert(
          "Não foi possível encontrar uma palavra. Tente outros idiomas."
        );
      }
    } catch (error) {
      console.error("❌ Erro ao iniciar jogo:", error);
      alert("Erro ao iniciar o jogo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [preferences.selectedLanguages, preferences.wordLength]);

  return (
    <>
      {!gameStarted ? (
        <GameMenu
          selectedLanguages={preferences.selectedLanguages}
          setSelectedLanguages={(langs) =>
            updatePreference("selectedLanguages", langs)
          }
          wordLength={preferences.wordLength}
          setWordLength={(length) =>
            updatePreference("wordLength", length)
          }
          darkMode={preferences.darkMode}
          setDarkMode={(dark) => updatePreference("darkMode", dark)}
          reduceMotion={preferences.reduceMotion}
          setReduceMotion={(reduce) =>
            updatePreference("reduceMotion", reduce)
          }
          startNewGame={startNewGame}
          isLoading={isLoading}
          showLanguage={preferences.showLanguage}
          setShowLanguage={(show) =>
            updatePreference("showLanguage", show)
          }
        />
      ) : (
        <>
          <div className="guess-results">
            <Guesses
              guess={guess}
              submittedGuesses={submittedGuesses}
              totalGuesses={NUM_OF_GUESSES_ALLOWED}
              inputRef={inputRef}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              wordLength={preferences.wordLength}
              selectedLanguages={preferences.selectedLanguages}
              answer={answer}
              showLanguage={preferences.showLanguage}
            />
          </div>
          <UserInput
            guess={guess}
            setGuess={setGuess}
            submittedGuesses={submittedGuesses}
            setSubmittedGuesses={setSubmittedGuesses}
            totalGuesses={NUM_OF_GUESSES_ALLOWED}
            answer={answer}
            inputRef={inputRef}
            resetActiveIndex={setActiveIndex}
            allWords={allWords}
            wordLength={preferences.wordLength}
          />
        </>
      )}
    </>
  );
}

export default Game;
