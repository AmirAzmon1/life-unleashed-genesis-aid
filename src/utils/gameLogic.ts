
// Conway's Game of Life logic utilities

export const createEmptyGrid = (size: number): number[][] => {
  return Array(size).fill(null).map(() => Array(size).fill(0));
};

export const randomizeGrid = (size: number, probability: number = 0.3): number[][] => {
  return Array(size).fill(null).map(() => 
    Array(size).fill(null).map(() => 
      Math.random() < probability ? 1 : 0
    )
  );
};

export const countNeighbors = (grid: number[][], row: number, col: number): number => {
  const size = grid.length;
  let count = 0;
  
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the cell itself
      
      const newRow = row + i;
      const newCol = col + j;
      
      // Check bounds
      if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size) {
        count += grid[newRow][newCol];
      }
    }
  }
  
  return count;
};

export const getNextGeneration = (grid: number[][]): number[][] => {
  const size = grid.length;
  const newGrid = createEmptyGrid(size);
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const neighbors = countNeighbors(grid, row, col);
      const currentCell = grid[row][col];
      
      // Conway's Game of Life rules:
      // 1. Any live cell with fewer than two live neighbors dies (underpopulation)
      // 2. Any live cell with two or three live neighbors lives on to the next generation
      // 3. Any live cell with more than three live neighbors dies (overpopulation)
      // 4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction)
      
      if (currentCell === 1) {
        // Live cell
        if (neighbors === 2 || neighbors === 3) {
          newGrid[row][col] = 1; // Survives
        } else {
          newGrid[row][col] = 0; // Dies
        }
      } else {
        // Dead cell
        if (neighbors === 3) {
          newGrid[row][col] = 1; // Becomes alive
        } else {
          newGrid[row][col] = 0; // Stays dead
        }
      }
    }
  }
  
  return newGrid;
};

export const copyGrid = (grid: number[][]): number[][] => {
  return grid.map(row => [...row]);
};
