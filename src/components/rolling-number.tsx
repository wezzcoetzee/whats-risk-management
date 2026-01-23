"use client";

import { useEffect, useRef, useState, memo } from "react";

interface RollingDigitProps {
  char: string;
  prevChar: string | null;
  direction: "up" | "down" | null;
}

const RollingDigit = memo(function RollingDigit({
  char,
  prevChar,
  direction,
}: RollingDigitProps) {
  const shouldAnimate = prevChar !== null && prevChar !== char && direction !== null;

  if (!shouldAnimate) {
    return <span className="inline-block">{char}</span>;
  }

  return (
    <span className="inline-block relative overflow-hidden">
      <span
        className={`inline-block transition-transform duration-150 ease-out ${
          direction === "up" ? "-translate-y-full" : "translate-y-full"
        } opacity-0`}
      >
        {prevChar}
      </span>
      <span
        className={`absolute left-0 top-0 inline-block ${
          direction === "up" ? "animate-roll-up" : "animate-roll-down"
        }`}
      >
        {char}
      </span>
    </span>
  );
});

interface RollingNumberProps {
  value: string;
  className?: string;
}

export function RollingNumber({ value, className = "" }: RollingNumberProps) {
  const [displayChars, setDisplayChars] = useState<string[]>(value.split(""));
  const [prevChars, setPrevChars] = useState<(string | null)[]>(
    value.split("").map(() => null)
  );
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const prevValueRef = useRef(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (value === prevValueRef.current) return;

    const prevNum = parseFloat(prevValueRef.current.replace(/[^0-9.-]/g, ""));
    const currNum = parseFloat(value.replace(/[^0-9.-]/g, ""));

    const newChars = value.split("");
    const oldChars = prevValueRef.current.split("");

    const maxLen = Math.max(newChars.length, oldChars.length);
    const paddedNew = newChars.join("").padStart(maxLen, " ").split("");
    const paddedOld = oldChars.join("").padStart(maxLen, " ").split("");

    const prevCharsForAnim: (string | null)[] = paddedNew.map((char, i) => {
      return paddedOld[i] !== char ? paddedOld[i] ?? null : null;
    });

    if (!isNaN(prevNum) && !isNaN(currNum) && prevNum !== currNum) {
      const dir = currNum > prevNum ? "up" : "down";
      setDirection(dir);
      setPrevChars(prevCharsForAnim);
      setDisplayChars(newChars);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setDirection(null);
        setPrevChars(newChars.map(() => null));
      }, 200);
    } else {
      setDisplayChars(newChars);
      setPrevChars(newChars.map(() => null));
    }

    prevValueRef.current = value;

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  const offset = prevChars.length - displayChars.length;

  return (
    <span className={`inline-flex ${className}`}>
      {displayChars.map((char, i) => (
        <RollingDigit
          key={`${i}-${char}`}
          char={char}
          prevChar={prevChars[i + offset] ?? null}
          direction={direction}
        />
      ))}
    </span>
  );
}
