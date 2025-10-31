import React from "react";

import HelpModal from "../HelpModal";
import CreditsModal from "../CreditsModal";

import { BadgeQuestionMark, CircleUserRound } from 'lucide-react';

function Header() {
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showCreditsModal, setShowCreditsModal] =
    React.useState(false);

  function handleHelpClick() {
    setShowHelpModal(true);
  }

  function handleCreditsClick() {
    setShowCreditsModal(true);
  }

  return (
    <>
      <header>
        <div className="side">
          <button
            className="help-button"
            aria-label="How to play"
            onClick={handleHelpClick}
          >
            <BadgeQuestionMark />
          </button>
        </div>
        <h1>So many languages 🌎</h1>
        <div className="side">
          <button
            className="credits-button"
            aria-label="Credits"
            onClick={handleCreditsClick}
          >
            <CircleUserRound />
          </button>
        </div>
      </header>
      {showHelpModal && (
        <HelpModal
          isOpen={showHelpModal}
          onClose={() => setShowHelpModal(false)}
          setShowHelpModal={setShowHelpModal}
        />
      )}
      {showCreditsModal && (
        <CreditsModal
          isOpen={showCreditsModal}
          onClose={() => setShowCreditsModal(false)}
          setShowCreditsModal={setShowCreditsModal}
        />
      )}
    </>
  );
}

export default Header;
