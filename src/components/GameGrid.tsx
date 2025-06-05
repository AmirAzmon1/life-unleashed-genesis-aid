import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface GameGridProps {
  grid: number[][];
  onCellClick: (row: number, col: number) => void;
  cellSize: number;
}

const GameGrid: React.FC<GameGridProps> = ({ grid, onCellClick, cellSize }) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div 
          className="grid gap-0.5"
          style={{ 
            gridTemplateColumns: `repeat(${grid.length}, ${cellSize}px)`,
            width: 'fit-content',
            margin: '0 auto'
          }}
        >
          {grid.map((row, i) => 
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-${cellSize} h-${cellSize} cursor-pointer transition-colors duration-200 ${
                  cell ? 'bg-green-500' : 'bg-gray-700'
                } hover:bg-opacity-80`}
                onClick={() => onCellClick(i, j)}
                style={{ width: cellSize, height: cellSize }}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameGrid; 