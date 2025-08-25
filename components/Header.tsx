
import React from 'react';

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="flex items-center gap-3">
        <div className="text-3xl">🌱</div>
        <h1 className="text-2xl font-bold text-emerald-800">
          Sustainable Shopper
        </h1>
      </div>
      <p className="text-gray-600 mt-1">Your guide to responsible consumption online.</p>
    </div>
  </header>
);
