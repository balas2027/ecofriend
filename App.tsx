
import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Header } from './components/Header';
import { ProductInput } from './components/ProductInput';
import { ResultsCard } from './components/ResultsCard';
import type { AnalysisResult } from './types';
import { Rating } from './types';

const extractProductNameFromUrl = (url: string): string | null => {
    try {
        const { hostname, pathname } = new URL(url);
        const pathSegments = pathname.split('/').filter(Boolean);

        let productIdentifier: string | undefined;

        // Rule for Amazon: Look for segment before /dp/ or /gp/product/
        const dpIndex = pathSegments.findIndex(p => p === 'dp' || p === 'gp');
        if (hostname.includes('amazon') && dpIndex > 0) {
            productIdentifier = pathSegments[dpIndex - 1];
        } 
        
        // Generic fallback: find the longest segment that doesn't look like an ID
        if (!productIdentifier) {
            productIdentifier = pathSegments
                .filter(p => isNaN(parseInt(p)) && p.length > 8 && !p.includes('.html'))
                .sort((a, b) => b.length - a.length)[0];
        }

        if (productIdentifier) {
            const cleanedName = decodeURIComponent(productIdentifier).replace(/-/g, ' ');
            
            // Capitalize for better display
            return cleanedName
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
        return null;
    } catch (e) {
        console.error("URL parsing error:", e);
        return null;
    }
};

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  const analyzeUrl = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);
    setShowIntro(false);

    if (!url || !url.startsWith('http')) {
        setError("Please enter a valid product URL.");
        setLoading(false);
        return;
    }

    const productName = extractProductNameFromUrl(url);

    if (!productName) {
        setError("Could not identify the product from the URL. Please try a different link.");
        setLoading(false);
        return;
    }

    try {
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
        
        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                score: {
                    type: Type.INTEGER,
                    description: 'A sustainability score from 0 (worst) to 100 (best).'
                },
                scoreReason: {
                    type: Type.STRING,
                    description: 'A brief explanation for the numerical score, considering factors like materials, lifecycle, and packaging.'
                },
                rating: { 
                    type: Type.STRING,
                    enum: [Rating.EcoFriendly, Rating.Moderate, Rating.NotEcoFriendly],
                },
                reason: {
                    type: Type.STRING,
                    description: 'A brief explanation for the categorical rating provided.'
                },
                alternatives: {
                    type: Type.ARRAY,
                    description: 'A list of up to two eco-friendly alternative products.',
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            brand: { type: Type.STRING },
                            reason: { type: Type.STRING, description: 'Why this alternative is more sustainable.'},
                            url: { type: Type.STRING, description: "A functional search URL (e.g., from Amazon or Flipkart) for the suggested product." }
                        },
                         required: ['name', 'brand', 'reason', 'url']
                    }
                }
            },
            required: ['score', 'scoreReason', 'rating', 'reason', 'alternatives']
        };

        const prompt = `As a sustainability expert, analyze the following product: "${productName}". 
        Provide a sustainability rating (Eco-Friendly, Moderate, or Not Eco-Friendly) and a brief reason for it.
        Also, provide a numerical sustainability score from 0 (worst) to 100 (best), and a brief explanation for that score based on factors like materials, production, durability, packaging, and end-of-life.
        Then, suggest up to two greener alternatives. 
        
        **Important Rule:** The alternatives MUST be in the same product category and serve the same primary function. For example, if the product is a 'plastic pen stand', suggest a 'bamboo pen stand' or 'recycled wood desk organizer', not a 'blackboard'.
        
        For each alternative, provide its name, brand, a reason for its sustainability, and a functional search URL on a major e-commerce site (like Amazon or Flipkart) that a user can click to find and purchase it.`;


        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });
        
        const resultJson = JSON.parse(response.text);

        const finalResult: AnalysisResult = {
            product: {
                name: productName,
                brand: 'Online Product',
                category: 'Inferred by AI'
            },
            rating: resultJson.rating as Rating,
            reason: resultJson.reason,
            score: resultJson.score,
            scoreReason: resultJson.scoreReason,
            alternatives: resultJson.alternatives
        };

        setAnalysisResult(finalResult);

    } catch (e) {
        console.error(e);
        setError("Failed to analyze the product with AI. The model may be busy or an error occurred. Please try again later.");
    } finally {
        setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50 font-sans text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
          <ProductInput onAnalyze={analyzeUrl} loading={loading} />
          {error && (
            <div className="mt-6 text-center text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {loading && (
            <div className="mt-8 text-center flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-emerald-700">Analyzing with Gemini AI...</span>
            </div>
        )}

        {!loading && analysisResult && (
          <div className="mt-8">
            <ResultsCard result={analysisResult} />
          </div>
        )}

        {showIntro && (
            <div className="mt-8 text-center text-gray-500 p-6 bg-gray-100 rounded-2xl">
                <h2 className="text-xl font-semibold text-emerald-800 mb-2">Welcome to Sustainable Shopper!</h2>
                <p>Paste a product link from an e-commerce site to get an instant AI-powered sustainability analysis and discover eco-friendly alternatives.</p>
            </div>
        )}

      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Promoting SDG 12: Responsible Consumption and Production</p>
      </footer>
    </div>
  );
};

export default App;
