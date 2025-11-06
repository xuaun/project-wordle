import React from "react";

import HelpModal from "../HelpModal";
import CreditsModal from "../CreditsModal";

import { BadgeQuestionMark, BadgeInfo } from "lucide-react";

import earthImage from "../../assets/Hands - Earth.png";

function Header() {
  const [showHelpModal, setShowHelpModal] = React.useState(false);
  const [showCreditsModal, setShowCreditsModal] =
    React.useState(false);

  React.useEffect(() => {
    const hasVisitedGameBefore =
      localStorage.getItem("hasVisitedGame");

    if (!hasVisitedGameBefore) {
      setShowHelpModal(true);
      localStorage.setItem("hasVisitedGame", "true");
    }
  }, [setShowHelpModal]);

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
        <div className="header-title">
          <a href="./">
            <h1>
              So Many Languages{" "}
              <img
                src={earthImage}
                alt=""
                aria-hidden="true"
                className="headerImg"
              />
            </h1>
          </a>
        </div>
        <div className="side">
          <button
            className="credits-button"
            aria-label="Credits"
            onClick={handleCreditsClick}
          >
            <BadgeInfo />
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
