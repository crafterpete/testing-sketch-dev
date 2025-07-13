import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-fantasy-purple/20 to-fantasy-blue/20 backdrop-blur-sm"></div>
      <div className="relative z-10 container mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-fantasy-gold mb-6 font-fantasy floating">
          Enter Any World
        </h1>
        <p className="text-xl md:text-2xl text-fantasy-light mb-8 max-w-3xl mx-auto">
          Rolely.ai is a generative AI game that immerses you into any world you can imagine.
          Step into your own personalized simulation and begin your adventure.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="bg-fantasy-dark/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-fantasy-gold/30">
            <span className="text-fantasy-gold font-semibold">✨ Infinite Worlds</span>
          </div>
          <div className="bg-fantasy-dark/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-fantasy-gold/30">
            <span className="text-fantasy-gold font-semibold">🎮 AI-Powered</span>
          </div>
          <div className="bg-fantasy-dark/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-fantasy-gold/30">
            <span className="text-fantasy-gold font-semibold">🌟 Immersive</span>
          </div>
        </div>
      </div>
    </section>
  );
};
