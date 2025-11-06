import React from "react";
import { AVAILABLE_LANGUAGES } from "../../services/wordService";
import { FLAG_COMPONENTS } from "../../constants";

import "./LanguageSelector.css";

function LanguageSelector({ selectedLanguages, onChange, disabled }) {
  const handleToggle = (languageCode) => {
    if (selectedLanguages.includes(languageCode)) {
      onChange(
        selectedLanguages.filter((code) => code !== languageCode)
      );
    } else {
      onChange([...selectedLanguages, languageCode]);
    }
  };

  return (
    <div className="language-selector">
      <h3>Select Languages:</h3>
      <div className="language-options">
        {AVAILABLE_LANGUAGES.map((lang) => {
          const FlagComponent = FLAG_COMPONENTS[lang.code];
          return (
            <div className="checkbox-wrapper-40" key={lang.code}>
              <label className="language-option">
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(lang.code)}
                  onChange={() => handleToggle(lang.code)}
                  disabled={disabled}
                />
                <span className="checkbox"></span>
                {FlagComponent && (
                  <FlagComponent className="language-flag" />
                )}
                <span lang={lang.code}>{lang.name}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSelector;
