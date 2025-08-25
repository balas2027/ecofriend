
import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (clampedScore / 100) * circumference;

  let colorClass = 'text-green-600';
  if (clampedScore < 40) {
    colorClass = 'text-red-600';
  } else if (clampedScore < 70) {
    colorClass = 'text-yellow-600';
  }

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={colorClass}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${colorClass}`}>
        <span className="text-3xl font-bold">{clampedScore}</span>
        <span className="text-xs font-semibold">SCORE</span>
      </div>
    </div>
  );
};
