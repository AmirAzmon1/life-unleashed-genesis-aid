import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/context/GameContext';
import GameGrid from './GameGrid';
import GameControls from './GameControls';
import PatternLibrary from './PatternLibrary';
import { toast } from '@/hooks/use-toast';
import SavedBoardsModal from './SavedBoardsModal';

const GameOfLife: React.FC = () => {
  const {
    grid,
    isRunning,
    generation,
    gridSize,
    speed,
    toggleCell,
    startSimulation,
    stopSimulation,
    clearGrid,
    randomizeGrid,
    setGridSize,
    setSpeed,
    loadPattern,
    saveState,
    loadState
  } = useGame();

  const [savedBoardsOpen, setSavedBoardsOpen] = useState(false);

  const cellSize = Math.max(8, Math.min(20, 600 / gridSize));

  const handleStart = () => {
    startSimulation();
    toast({
      title: "Simulation Started",
      description: "Conway's Game of Life is now running",
    });
  };

  const handleStop = () => {
    stopSimulation();
    toast({
      title: "Simulation Stopped",
      description: "You can now edit individual cells",
    });
  };

  const handleClear = () => {
    clearGrid();
    toast({
      title: "Grid Cleared",
      description: "All cells have been cleared",
    });
  };

  const handleRandomize = () => {
    randomizeGrid();
    toast({
      title: "Grid Randomized",
      description: "Random pattern has been generated",
    });
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const handleGridSizeChange = (newSize: number) => {
    setGridSize(newSize);
  };

  const handlePatternLoad = (pattern: number[][]) => {
    loadPattern(pattern);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
          Conway's Game of Life
        </h1>
        <p className="text-center text-cyan-300 mb-8">
          A cellular automaton simulation where cells evolve based on simple rules
        </p>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <GameControls
                isRunning={isRunning}
                speed={speed}
                gridSize={gridSize}
                onStart={handleStart}
                onStop={handleStop}
                onClear={handleClear}
                onRandomize={handleRandomize}
                onSpeedChange={handleSpeedChange}
                onGridSizeChange={handleGridSizeChange}
                generation={generation}
                status={isRunning ? 'Running' : 'Stopped'}
              />
              <PatternLibrary onPatternLoad={handlePatternLoad} />
              <SavedBoardsModal open={savedBoardsOpen} onClose={() => setSavedBoardsOpen(false)} />
            </div>
            
            <div className="lg:col-span-3">
              <GameGrid
                grid={grid}
                onCellClick={toggleCell}
                cellSize={cellSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
