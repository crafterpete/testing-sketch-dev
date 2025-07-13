import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-fantasy-dark/90 backdrop-blur-sm border-b border-fantasy-gold/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-fantasy-gold to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-fantasy-dark font-bold text-sm">R</span>
            </div>
            <h1 className="text-2xl font-bold text-fantasy-gold font-fantasy">Rolely.ai</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#about" className="text-fantasy-light hover:text-fantasy-gold transition-colors">
              About
            </a>
            <a href="#features" className="text-fantasy-light hover:text-fantasy-gold transition-colors">
              Features
            </a>
            <a href="#play" className="text-fantasy-light hover:text-fantasy-gold transition-colors">
              Play
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
