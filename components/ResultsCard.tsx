
import React from 'react';
import type { AnalysisResult } from '../types';
import { Rating } from '../types';
import { RatingBadge } from './RatingBadge';
import { AlternativeProductCard } from './AlternativeProductCard';
import { ScoreDisplay } from './ScoreDisplay';

interface ResultsCardProps {
  result: AnalysisResult;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ result }) => {
  const { product, rating, reason, score, scoreReason, alternatives } = result;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b pb-4 mb-4">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-500">{product.brand} - {product.category}</p>
          <div className="mt-3">
             <RatingBadge rating={rating} />
          </div>
        </div>
        <div className="flex-shrink-0">
          <ScoreDisplay score={score} />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sustainability Insights:</h3>
        <div className="text-gray-600 bg-gray-50 p-4 rounded-lg space-y-3">
            <p><strong className="font-semibold text-gray-800">Rating Rationale:</strong> {reason}</p>
            <p><strong className="font-semibold text-gray-800">Score Breakdown:</strong> {scoreReason}</p>
        </div>
      </div>

      {alternatives && alternatives.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Greener Alternatives:</h3>
          <div className="space-y-4">
            {alternatives.map((alt, index) => (
              <AlternativeProductCard key={index} product={alt} />
            ))}
          </div>
        </div>
      )}

      {rating === Rating.EcoFriendly && (
         <div className="mt-6 text-center p-4 bg-green-50 rounded-lg text-green-800">
            <p className="font-semibold">This is a great sustainable choice! Keep it up.</p>
        </div>
      )}
    </div>
  );
};
