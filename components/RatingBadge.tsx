
import React from 'react';
import { Rating } from '../types';
import { LeafIcon } from './icons/LeafIcon';
import { WarningIcon } from './icons/WarningIcon';
import { DangerIcon } from './icons/DangerIcon';

interface RatingBadgeProps {
  rating: Rating;
}

const ratingStyles = {
  [Rating.EcoFriendly]: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: <LeafIcon />,
  },
  [Rating.Moderate]: {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: <WarningIcon />,
  },
  [Rating.NotEcoFriendly]: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    icon: <DangerIcon />,
  },
  [Rating.NotFound]: {
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    icon: <span className="text-xl">?</span>,
  }
};

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => {
  const styles = ratingStyles[rating];

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold text-sm ${styles.bgColor} ${styles.textColor} whitespace-nowrap`}>
      {styles.icon}
      <span>{rating}</span>
    </div>
  );
};
