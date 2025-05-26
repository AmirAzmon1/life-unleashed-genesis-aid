
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlay, CircleStop, SquareX } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PatternLibrary from './PatternLibrary';
import { getNextGeneration, createEmptyGrid, randomizeGrid } from '../utils/gameLogic';

const GameOfLife: React.FC = () => {
  const [gridSize, setGridSize] = useState(40);
  const [grid, setGrid] = useState(() => createEmptyGrid(40));
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [generation, setGeneration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize with a glider pattern
  useEffect(() => {
    const newGrid = createEmptyGrid(gridSize);
    // Glider pattern
    newGrid[1][2] = 1;
    newGrid[2][3] = 1;
    newGrid[3][1] = 1;
    newGrid[3][2] = 1;
    newGrid[3][3] = 1;
    setGrid(newGrid);
    setGeneration(0);
  }, [gridSize]);

  const runSimulation = useCallback(() => {
    if (!isRunning) return;
    
    setGrid(currentGrid => {
      const newGrid = getNextGeneration(currentGrid);
      setGeneration(gen => gen + 1);
      return newGrid;
    });
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(runSimulation, 1000 - speed * 9);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, speed, runSimulation]);

  const toggleCell = (row: number, col: number) => {
    if (isRunning) return;
    
    setGrid(currentGrid => {
      const newGrid = currentGrid.map(r => [...r]);
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return newGrid;
    });
  };

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: "Simulation Started",
      description: "Conway's Game of Life is now running",
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    toast({
      title: "Simulation Stopped",
      description: "You can now edit individual cells",
    });
  };

  const handleClear = () => {
    setIsRunning(false);
    setGrid(createEmptyGrid(gridSize));
    setGeneration(0);
    toast({
      title: "Grid Cleared",
      description: "All cells have been cleared",
    });
  };

  const handleRandomize = () => {
    setIsRunning(false);
    setGrid(randomizeGrid(gridSize));
    setGeneration(0);
    toast({
      title: "Grid Randomized",
      description: "Random pattern has been generated",
    });
  };

  const handleGridSizeChange = (newSize: number) => {
    if (newSize < 10 || newSize > 100) return;
    setIsRunning(false);
    setGridSize(newSize);
  };

  const handlePatternLoad = (pattern: number[][]) => {
    setIsRunning(false);
    const newGrid = createEmptyGrid(gridSize);
    
    // Center the pattern
    const startRow = Math.floor((gridSize - pattern.length) / 2);
    const startCol = Math.floor((gridSize - pattern[0].length) / 2);
    
    for (let i = 0; i < pattern.length; i++) {
      for (let j = 0; j < pattern[i].length; j++) {
        if (startRow + i < gridSize && startCol + j < gridSize) {
          newGrid[startRow + i][startCol + j] = pattern[i][j];
        }
      }
    }
    
    setGrid(newGrid);
    setGeneration(0);
  };

  const saveState = () => {
    const state = {
      grid,
      generation,
      gridSize,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gameOfLifeState', JSON.stringify(state));
    toast({
      title: "State Saved",
      description: "Current board state has been saved to local storage",
    });
  };

  const loadState = () => {
    const saved = localStorage.getItem('gameOfLifeState');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setIsRunning(false);
        setGrid(state.grid);
        setGeneration(state.generation);
        setGridSize(state.gridSize);
        toast({
          title: "State Loaded",
          description: `Loaded state from ${new Date(state.timestamp).toLocaleString()}`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load saved state",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "No Saved State",
        description: "No saved state found in local storage",
        variant: "destructive",
      });
    }
  };

  const cellSize = Math.max(8, Math.min(20, 600 / gridSize));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-green-400">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={isRunning ? handleStop : handleStart}
                  className={`flex-1 ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isRunning ? <CircleStop className="w-4 h-4 mr-2" /> : <CirclePlay className="w-4 h-4 mr-2" />}
                  {isRunning ? 'Stop' : 'Start'}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="destructive"
                  className="flex-1"
                >
                  <SquareX className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
              
              <Button
                onClick={handleRandomize}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Randomize
              </Button>

              <div className="space-y-2">
                <Label>Speed: {speed}%</Label>
                <Slider
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gridSize">Grid Size: {gridSize}x{gridSize}</Label>
                <Input
                  id="gridSize"
                  type="number"
                  value={gridSize}
                  onChange={(e) => handleGridSizeChange(parseInt(e.target.value) || 40)}
                  min={10}
                  max={100}
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Button onClick={saveState} className="w-full bg-purple-600 hover:bg-purple-700">
                  Save State
                </Button>
                <Button onClick={loadState} className="w-full bg-purple-600 hover:bg-purple-700">
                  Load State
                </Button>
              </div>

              <div className="text-sm text-gray-400 space-y-1">
                <p>Generation: {generation}</p>
                <p>Status: {isRunning ? 'Running' : 'Stopped'}</p>
                <p className="text-xs">Click cells to toggle when stopped</p>
              </div>
            </CardContent>
          </Card>

          <PatternLibrary onPatternLoad={handlePatternLoad} />
        </div>

        {/* Game Grid */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div 
                className="grid gap-px bg-gray-600 border-2 border-gray-600 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
                  width: 'fit-content'
                }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        cursor-pointer transition-all duration-150 
                        ${cell ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-800 hover:bg-gray-700'}
                        ${!isRunning ? 'hover:scale-110' : ''}
                      `}
                      style={{
                        width: cellSize,
                        height: cellSize,
                      }}
                      onClick={() => toggleCell(rowIndex, colIndex)}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
