import { useState, useEffect } from "react";

const STORAGE_KEY = "wordle-user-preferences";

export function useUserPreferences() {
  const [preferences, setPreferences] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    return {
      showLanguage: true,
      reduceMotion: prefersReducedMotion,
      darkMode: prefersDarkMode,
      selectedLanguages: ["pt-br", "en"],
      wordLength: 5,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));

    document.documentElement.setAttribute(
      "data-theme",
      preferences.darkMode ? "dark" : "light"
    );

    document.documentElement.setAttribute(
      "data-reduce-motion",
      preferences.reduceMotion ? "true" : "false"
    );
  }, [preferences]);

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return [preferences, updatePreference];
}
