import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-fantasy-dark/80 backdrop-blur-sm border-t border-fantasy-gold/20 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-fantasy-light/80">
          © 2024 Rolely.ai - Powered by AI imagination
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#" className="text-fantasy-light/60 hover:text-fantasy-gold transition-colors">
            Privacy
          </a>
          <a href="#" className="text-fantasy-light/60 hover:text-fantasy-gold transition-colors">
            Terms
          </a>
          <a href="#" className="text-fantasy-light/60 hover:text-fantasy-gold transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};
