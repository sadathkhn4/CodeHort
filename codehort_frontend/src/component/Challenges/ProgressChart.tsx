import React from "react";

interface CircleProgressProps {
  total: number;
  solved: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({ total, solved }) => {
  const radius = 100; 
  const circumference = 2 * Math.PI * radius; 
  const solvedPercentage = (solved / total) * 100;
  const solvedStroke = (solved / total) * circumference; 

  return (
    <svg width="240" height="240">
      <circle
        cx="120"
        cy="120"
        r={radius}
        fill="none"
        stroke="#ccc"
        strokeWidth="3"
      />
      <circle
        cx="120"
        cy="120"
        r={radius}
        fill="none"
        stroke="#7ba18a"
        strokeWidth="6"
        strokeDasharray={`${solvedStroke} ${circumference}`}
        transform="rotate(-90 120 120)"
      />
      <text x="50%" y="50%" dy=".3em" textAnchor="middle">
        {solved}/{total}
        <tspan x="50%" dy="1.2em">Solved</tspan>
      </text>
    </svg>
  );
};

export default CircleProgress;
