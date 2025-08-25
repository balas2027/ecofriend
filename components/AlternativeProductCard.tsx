
import React from 'react';
import type { AlternativeProduct } from '../types';

interface AlternativeProductCardProps {
  product: AlternativeProduct;
}

export const AlternativeProductCard: React.FC<AlternativeProductCardProps> = ({ product }) => {
  return (
    <div className="border border-green-200 bg-green-50 p-4 rounded-lg transition-shadow hover:shadow-md">
        <div className="flex justify-between items-start gap-4">
            <div>
                <h4 className="font-bold text-green-900">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                <p className="text-sm text-green-800">{product.reason}</p>
            </div>
            <a 
                href={product.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-white text-emerald-700 border border-emerald-600 font-semibold py-1 px-3 rounded-md hover:bg-emerald-50 transition-colors text-sm"
            >
                View
            </a>
        </div>
    </div>
  );
};
