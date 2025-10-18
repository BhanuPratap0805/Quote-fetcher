import { useState } from 'react';
import { RefreshCw, Quote } from 'lucide-react';

export default function QuoteFetcher() {
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/quote');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      setQuote({ text: data.content, author: data.author });
    } catch (err) {
      setError('Failed to fetch quote. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex items-center justify-center mb-6">
          <Quote className="w-12 h-12 text-purple-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Random Quote Generator
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {quote.text ? (
          <div className="mb-8">
            <blockquote className="text-xl text-gray-700 italic mb-4 leading-relaxed">
              "{quote.text}"
            </blockquote>
            <p className="text-right text-gray-600 font-semibold">
              — {quote.author}
            </p>
          </div>
        ) : (
          <div className="mb-8 text-center text-gray-500 py-12">
            Click the button below to fetch an inspiring quote
          </div>
        )}
        
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Fetching...' : 'Get New Quote'}
        </button>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          Powered by Quotable API
        </div>
      </div>
    </div>
  );
}