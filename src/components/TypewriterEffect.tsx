import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  className?: string;
  cursor?: boolean;
  loop?: boolean;
  startDelay?: number;
  characterDelay?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
  randomSpeed?: boolean;
  glitchEffect?: boolean;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseTime = 2000,
  className = '',
  cursor = true,
  loop = true,
  startDelay = 0,
  showCursor = true,
  cursorChar = '|',
  onComplete,
  randomSpeed = false,
  glitchEffect = false,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [glitchChars, setGlitchChars] = useState('');

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cursorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const glitchCharacters = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

  // Start delay logic
  useEffect(() => {
    if (!isStarted && startDelay > 0) {
      const delay = setTimeout(() => setIsStarted(true), startDelay);
      return () => clearTimeout(delay);
    } else {
      setIsStarted(true);
    }
  }, [startDelay, isStarted]);

  // Main typing logic
  useEffect(() => {
    if (!isStarted || texts.length === 0) return;

    const fullText = texts[currentTextIndex];
    const isCompleteTyping = !isDeleting && currentText === fullText;
    const isFinishedDeleting = currentText.length === 0 && isDeleting;

    const getTypingSpeed = () => {
      const base = isDeleting ? deleteSpeed : speed;
      return randomSpeed ? base + Math.random() * 50 - 25 : base;
    };

    const applyGlitch = () => {
      if (!glitchEffect) return;

      const glitchLength = Math.floor(Math.random() * 2) + 1;
      const chars = Array.from({ length: glitchLength }, () =>
        glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
      ).join('');
      setGlitchChars(chars);
      setTimeout(() => setGlitchChars(''), 100);
    };

    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1));
      } else if (currentText.length < fullText.length) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (glitchEffect && Math.random() < 0.1) applyGlitch();
      }

      if (isCompleteTyping) {
        if (loop) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        } else {
          onComplete?.();
        }
      }

      if (isFinishedDeleting) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, getTypingSpeed());

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentText, currentTextIndex, isDeleting, isStarted]);

  // Cursor blinking
  useEffect(() => {
    if (!cursor || !showCursor) return;

    cursorIntervalRef.current = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, [cursor, showCursor]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  return (
    <span className={`inline-block ${className}`}>
      <span className="relative">
        <span className="relative z-10">{currentText}</span>
        {glitchChars && (
          <span className="absolute top-0 left-0 z-0 text-red-400 opacity-70 animate-pulse pointer-events-none">
            {currentText.slice(0, -glitchChars.length)}
            {glitchChars}
          </span>
        )}
      </span>
      {cursor && showCursor && (
        <span
          className={`ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypewriterEffect;
