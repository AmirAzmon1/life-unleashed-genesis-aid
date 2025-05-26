
import React from 'react';
import GameOfLife from '../components/GameOfLife';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Conway's Game of Life
          </h1>
          <p className="text-gray-400">
            A cellular automaton simulation where cells evolve based on simple rules
          </p>
        </header>
        <GameOfLife />
      </div>
    </div>
  );
};

export default Index;
