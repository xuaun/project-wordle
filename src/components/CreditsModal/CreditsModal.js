import React from "react";
import { FocusTrap } from "focus-trap-react";

function CreditsModal({ setShowCreditsModal }) {
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
        setShowCreditsModal(false);
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
  }, [setShowCreditsModal]);

  return (
    <FocusTrap>
      <div
        className="modal-backdrop"
        onClick={() => setShowCreditsModal(false)}
        id="creditsModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        ref={modalRef}
      >
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            onClick={() => setShowCreditsModal(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="visually-hidden">Close credits</span>
          </button>
          <h2 id="modal-title">Credits</h2>
          <div id="modal-desc">
            <p>
              Developed by João Víctor Araujo -{" "}
              <a
                href="https://github.com/xuaun"
                target="_blank"
                rel="noopener noreferrer"
                className="creditsLink"
              >
                Xuaun{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                  className="creditsSvg"
                >
                  <mask id="external-icon-mask-:Rn6eamqd5m:">
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="white"
                    ></rect>
                    <rect
                      x="10"
                      y="0"
                      width="16"
                      height="14"
                      fill="black"
                    ></rect>
                  </mask>
                  <rect
                    x="3"
                    y="6"
                    width="15"
                    height="15"
                    rx="2"
                    mask="url(#external-icon-mask-:Rn6eamqd5m:)"
                  ></rect>
                  <path
                    d="M 10 14 L 20 4 h -6 h 6 v 6"
                    stroke="currentColor"
                    className="ExternalIcon__Arrow-sc-8dc1f287-0 gdVPue"
                  ></path>
                </svg>
                <span className="visually-hidden">
                  (opens in new tab)
                </span>
              </a>
              .
            </p>
            <p>
              <strong>Word Game</strong> is inspired by{" "}
              <a
                href="https://www.nytimes.com/games/wordle/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="creditsLink"
              >
                Wordle{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                  className="creditsSvg"
                >
                  <mask id="external-icon-mask-:Rn6eamqd5m:">
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="white"
                    ></rect>
                    <rect
                      x="10"
                      y="0"
                      width="16"
                      height="14"
                      fill="black"
                    ></rect>
                  </mask>
                  <rect
                    x="3"
                    y="6"
                    width="15"
                    height="15"
                    rx="2"
                    mask="url(#external-icon-mask-:Rn6eamqd5m:)"
                  ></rect>
                  <path
                    d="M 10 14 L 20 4 h -6 h 6 v 6"
                    stroke="currentColor"
                    className="ExternalIcon__Arrow-sc-8dc1f287-0 gdVPue"
                  ></path>
                </svg>
                <span className="visually-hidden">
                  (opens in new tab)
                </span>
              </a>{" "}
              and created in the course{" "}
              <a
                href="https://www.joyforjs.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="creditsLink joy"
              >
                Joy of React{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                  className="creditsSvg"
                >
                  <mask id="external-icon-mask-:Rn6eamqd5m:">
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="white"
                    ></rect>
                    <rect
                      x="10"
                      y="0"
                      width="16"
                      height="14"
                      fill="black"
                    ></rect>
                  </mask>
                  <rect
                    x="3"
                    y="6"
                    width="15"
                    height="15"
                    rx="2"
                    mask="url(#external-icon-mask-:Rn6eamqd5m:)"
                  ></rect>
                  <path
                    d="M 10 14 L 20 4 h -6 h 6 v 6"
                    stroke="currentColor"
                    className="ExternalIcon__Arrow-sc-8dc1f287-0 gdVPue"
                  ></path>
                </svg>
                <span className="visually-hidden">
                  (opens in new tab)
                </span>
              </a>{" "}
              by{" "}
              <a
                href="https://www.joshwcomeau.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="creditsLink"
              >
                Josh Comeau{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{
                    width: "0.8em",
                    height: "0.8em",
                    opacity: 0.7,
                  }}
                  aria-hidden="true"
                  className="creditsSvg"
                >
                  <mask id="external-icon-mask-:Rn6eamqd5m:">
                    <rect
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      fill="white"
                    ></rect>
                    <rect
                      x="10"
                      y="0"
                      width="16"
                      height="14"
                      fill="black"
                    ></rect>
                  </mask>
                  <rect
                    x="3"
                    y="6"
                    width="15"
                    height="15"
                    rx="2"
                    mask="url(#external-icon-mask-:Rn6eamqd5m:)"
                  ></rect>
                  <path
                    d="M 10 14 L 20 4 h -6 h 6 v 6"
                    stroke="currentColor"
                    className="ExternalIcon__Arrow-sc-8dc1f287-0 gdVPue"
                  ></path>
                </svg>
                <span className="visually-hidden">
                  (opens in new tab)
                </span>
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default CreditsModal;
