import React from "react";

interface CoffeeCupProps {
  size?: number;
  className?: string;
  /** Stroke color; defaults to the current text color. */
  stroke?: string;
  /** Cup fill color. */
  fill?: string;
}

/** Hand-drawn style coffee cup with animated steam. */
const CoffeeCup = ({
  size = 96,
  className = "",
  stroke = "currentColor",
  fill = "#F7E4D4",
}: CoffeeCupProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 96 96"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    {/* Steam */}
    <g className="steam" stroke={stroke} strokeWidth="3" strokeLinecap="round">
      <path d="M34 36c-4-5 4-8 0-14" />
      <path d="M48 34c-4-6 4-9 0-16" />
      <path d="M62 36c-4-5 4-8 0-14" />
    </g>

    {/* Cup */}
    <path
      d="M24 48h48v14c0 11-9 20-20 20h-8c-11 0-20-9-20-20V48z"
      fill={fill}
      stroke={stroke}
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Handle */}
    <path
      d="M72 53h4c5 0 9 4 9 9s-4 9-9 9h-5"
      stroke={stroke}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Saucer */}
    <path
      d="M18 88h60"
      stroke={stroke}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

export default CoffeeCup;
