import React, { useState } from 'react';

interface GameResponse {
  response: string;
  timestamp: string;
}

export const GameInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [gameResponse, setGameResponse] = useState<GameResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartGame = async () => {
    if (!prompt.trim()) {
      setError('Please enter a world description to begin your adventure!');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/api/game/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }

      const data = await response.json();
      setGameResponse({
        response: data.response,
        timestamp: data.timestamp
      });
    } catch (err) {
      setError('Failed to connect to game server. Please make sure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleStartGame();
    }
  };

  const examplePrompts = [
    "magic exists and dragons roam free",
    "I am a space explorer on an alien planet",
    "medieval times with mystical creatures",
    "cyberpunk city with advanced technology",
    "underwater kingdom with merfolk"
  ];

  return (
    <div className="bg-fantasy-dark/30 backdrop-blur-sm rounded-lg border border-fantasy-gold/30 p-6">
      <h2 className="text-2xl font-bold text-fantasy-gold mb-4 font-fantasy">Begin Your Adventure</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="world-prompt" className="block text-fantasy-light mb-2 font-semibold">
            Describe the world you want to explore:
          </label>
          <textarea
            id="world-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your world description... (e.g., 'a magical forest where time moves differently')"
            className="w-full h-32 p-4 bg-fantasy-dark/50 border border-fantasy-gold/30 rounded-lg text-fantasy-light placeholder-fantasy-light/50 focus:border-fantasy-gold focus:outline-none focus:ring-2 focus:ring-fantasy-gold/20 resize-none"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-fantasy-light/80 text-sm">Quick examples:</span>
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="text-xs bg-fantasy-purple/20 hover:bg-fantasy-purple/30 text-fantasy-gold px-3 py-1 rounded-full border border-fantasy-gold/20 transition-colors"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>

        <button
          onClick={handleStartGame}
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-fantasy-gold to-yellow-600 text-fantasy-dark font-bold py-3 px-6 rounded-lg hover:from-fantasy-gold/90 hover:to-yellow-600/90 transition-all duration-200 fantasy-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-fantasy-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating your world...
            </span>
          ) : (
            'Start Adventure'
          )}
        </button>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {gameResponse && (
          <div className="bg-fantasy-purple/20 border border-fantasy-gold/30 rounded-lg p-4">
            <h3 className="text-fantasy-gold font-semibold mb-2 font-fantasy">Your Adventure Begins:</h3>
            <p className="text-fantasy-light leading-relaxed mb-3">{gameResponse.response}</p>
            <div className="text-fantasy-light/60 text-sm">
              Generated at {new Date(gameResponse.timestamp).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-sm text-fantasy-light/80">
        <p className="font-semibold mb-2">Tips for better adventures:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Be specific about the setting and atmosphere</li>
          <li>Include interesting elements like magic, technology, or creatures</li>
          <li>Think about what makes your world unique</li>
          <li>Press Enter to start your adventure</li>
        </ul>
      </div>
    </div>
  );
};
