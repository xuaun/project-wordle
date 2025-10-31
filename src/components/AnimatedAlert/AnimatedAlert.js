import React from 'react';

// A duração do Fade Out deve ser igual à "transition-duration" no CSS
const FADE_DURATION_MS = 400; 

function AnimatedAlert({ show, className, children }) {
  const [shouldRender, setShouldRender] = React.useState(show);
  const [isVisible, setIsVisible] = React.useState(show);

  React.useEffect(() => {
    if (show) {
      setShouldRender(true);
      
      const fadeTimer = setTimeout(() => setIsVisible(true), 10);
      return () => {
        clearTimeout(fadeTimer);
      };

    } else {
      if (shouldRender) {
        setIsVisible(false);

        const hideTimer = setTimeout(() => {
          setShouldRender(false);
        }, FADE_DURATION_MS);

        return () => clearTimeout(hideTimer);
      }
    }
  }, [show, shouldRender]);

  if (!shouldRender) {
    return null;
  }
  
  const classes = [
    className,
    isVisible ? 'visible' : '',
  ].join(' ').trim();

  return (
    <p className={classes}>
      {children}
    </p>
  );
}

export default AnimatedAlert;