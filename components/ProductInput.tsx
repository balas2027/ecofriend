
import React, { useState } from 'react';

interface ProductInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export const ProductInput: React.FC<ProductInputProps> = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste an e-commerce product link here..."
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
        disabled={loading}
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-transform duration-200 ease-in-out hover:scale-105 disabled:bg-emerald-300 disabled:cursor-not-allowed disabled:scale-100"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  );
};
