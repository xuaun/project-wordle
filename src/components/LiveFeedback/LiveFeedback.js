import React from "react";

function LiveFeedback({ lastGuessFeedback }) {
  return (
    <span
      className="visually-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {lastGuessFeedback}
    </span>
  );
}

export default LiveFeedback;
