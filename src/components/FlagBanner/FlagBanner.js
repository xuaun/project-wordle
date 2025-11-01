import React from "react";
import { FLAG_COMPONENTS } from "../../constants";

export default function FlagBanner({ selectedLanguages = [] }) {
  if (!selectedLanguages || selectedLanguages.length === 0)
    return null;

  const flags = [];
  const repeatCount = Math.max(6, selectedLanguages.length);

  for (let i = 0; i < repeatCount; i++) {
    const code = selectedLanguages[i % selectedLanguages.length];
    flags.push({ code, key: `${code}-${i}` });
  }

  return (
    <div className="flag-banner visually-hidden" aria-hidden="true">
      <div className="flags-container">
        {flags.map(({ code, key }) => {
          const FlagComponent = FLAG_COMPONENTS[code];
          return (
            <div key={key} className="flag-wrapper">
              <div className="flag">
                {FlagComponent && (
                  <FlagComponent className="flag-icon-banner" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
