import { useState, useCallback, useRef, useEffect } from 'react';
import { createEmptyGrid, getNextGeneration, copyGrid, randomizeGrid } from '../utils/gameLogic';
import { toast } from '@/hooks/use-toast';

interface GameState {
  grid: number[][];
  isRunning: boolean;
  generation: number;
  gridSize: number;
  speed: number;
}

function isAllCellsDead(grid: number[][]): boolean {
  return grid.every(row => row.every(cell => cell === 0));
}

// Multi-state persistence helpers
const SAVED_STATES_KEY = 'gameOfLifeSavedStates';

function getSavedStates(): Array<{ name: string; state: any; timestamp: string }> {
  const raw = localStorage.getItem(SAVED_STATES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveNamedState(name: string, state: any) {
  const states = getSavedStates();
  const timestamp = new Date().toISOString();
  // Replace if name exists
  const idx = states.findIndex(s => s.name === name);
  if (idx !== -1) {
    states[idx] = { name, state, timestamp };
  } else {
    states.push({ name, state, timestamp });
  }
  localStorage.setItem(SAVED_STATES_KEY, JSON.stringify(states));
}

function loadNamedState(name: string): any | null {
  const states = getSavedStates();
  const found = states.find(s => s.name === name);
  return found ? found.state : null;
}

function deleteNamedState(name: string) {
  const states = getSavedStates().filter(s => s.name !== name);
  localStorage.setItem(SAVED_STATES_KEY, JSON.stringify(states));
}

export const useGameOfLife = (initialSize: number = 40) => {
  const [state, setState] = useState<GameState>({
    grid: createEmptyGrid(initialSize),
    isRunning: false,
    generation: 0,
    gridSize: initialSize,
    speed: 100
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const evolve = useCallback(() => {
    setState(prev => {
      const nextGrid = getNextGeneration(prev.grid);
      // בדיקה אם כל התאים מתים
      if (isAllCellsDead(nextGrid)) {
        toast({
          title: 'Game Over',
          description: 'All cells are dead. Simulation stopped.',
          variant: 'destructive',
        });
        return {
          ...prev,
          grid: nextGrid,
          isRunning: false,
          generation: prev.generation + 1
        };
      }
      return {
        ...prev,
        grid: nextGrid,
        generation: prev.generation + 1
      };
    });
  }, []);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(evolve, 1000 - state.speed * 9);
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
  }, [state.isRunning, state.speed, evolve]);

  const toggleCell = useCallback((row: number, col: number) => {
    if (state.isRunning) return;
    
    setState(prev => ({
      ...prev,
      grid: prev.grid.map((r, i) => 
        i === row ? r.map((cell, j) => j === col ? (cell ? 0 : 1) : cell) : r
      )
    }));
  }, [state.isRunning]);

  const startSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const stopSimulation = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const clearGrid = useCallback(() => {
    setState(prev => ({
      ...prev,
      grid: createEmptyGrid(prev.gridSize),
      generation: 0,
      isRunning: false
    }));
  }, []);

  const randomizeGridState = useCallback(() => {
    setState(prev => ({
      ...prev,
      grid: randomizeGrid(prev.gridSize),
      generation: 0,
      isRunning: false
    }));
  }, []);

  const setGridSize = useCallback((newSize: number) => {
    if (newSize < 10 || newSize > 100) return;
    setState(prev => ({
      ...prev,
      gridSize: newSize,
      grid: createEmptyGrid(newSize),
      generation: 0,
      isRunning: false
    }));
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    setState(prev => ({ ...prev, speed: newSpeed }));
  }, []);

  const loadPattern = useCallback((pattern: number[][]) => {
    setState(prev => {
      const newGrid = createEmptyGrid(prev.gridSize);
      const startRow = Math.floor((prev.gridSize - pattern.length) / 2);
      const startCol = Math.floor((prev.gridSize - pattern[0].length) / 2);
      
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          if (startRow + i < prev.gridSize && startCol + j < prev.gridSize) {
            newGrid[startRow + i][startCol + j] = pattern[i][j];
          }
        }
      }
      
      return {
        ...prev,
        grid: newGrid,
        generation: 0,
        isRunning: false
      };
    });
  }, []);

  const saveState = useCallback(() => {
    const stateToSave = {
      ...state,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('gameOfLifeState', JSON.stringify(stateToSave));
  }, [state]);

  const loadState = useCallback(() => {
    const saved = localStorage.getItem('gameOfLifeState');
    if (saved) {
      try {
        const savedState = JSON.parse(saved);
        setState({
          grid: savedState.grid,
          isRunning: false,
          generation: savedState.generation,
          gridSize: savedState.gridSize,
          speed: savedState.speed
        });
        return true;
      } catch (error) {
        console.error('Failed to load saved state:', error);
        return false;
      }
    }
    return false;
  }, []);

  return {
    ...state,
    toggleCell,
    startSimulation,
    stopSimulation,
    clearGrid,
    randomizeGrid: randomizeGridState,
    setGridSize,
    setSpeed,
    loadPattern,
    saveState,
    loadState,
    // Multi-state persistence
    saveNamedState: (name: string) => saveNamedState(name, {
      grid: state.grid,
      generation: state.generation,
      gridSize: state.gridSize,
      speed: state.speed,
    }),
    getSavedStates,
    loadNamedState: (name: string) => {
      const loaded = loadNamedState(name);
      if (loaded) {
        setState({
          grid: loaded.grid,
          isRunning: false,
          generation: loaded.generation,
          gridSize: loaded.gridSize,
          speed: loaded.speed
        });
        return true;
      }
      return false;
    },
    deleteNamedState,
  };
}; 