# Conway's Game of Life

A modern, interactive implementation of Conway's Game of Life built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- 40x40 grid by default (customizable)
- Start/Stop simulation
- Randomize or clear the grid
- Toggle individual cells (when stopped)
- Control simulation speed
- Pattern library (glider, blinker, beacon, toad, pulsar, and more)
- Save and load multiple board states (with custom names)
- Delete saved states
- All data is stored in your browser (localStorage)
- Responsive, modern UI

## Bonus Feature
- Save and restore multiple board states with custom names via localStorage
- Manage all saved boards in a dedicated modal (add, load, delete)

## Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Then open [http://localhost:8080](http://localhost:8080) in your browser.

## Usage
- Use the **Controls** panel to start/stop, clear, randomize, and adjust speed/grid size.
- Use the **Save State** button to save the current board with a custom name.
- Use the **Load State** button to load or delete any saved board.
- Use the **Pattern Library** to quickly load classic patterns.

## Project Structure
- `src/components/` — UI components (GameOfLife, GameControls, GameGrid, PatternLibrary, SavedBoardsModal)
- `src/hooks/useGameOfLife.ts` — Game logic and state management
- `src/utils/gameLogic.ts` — Pure functions for Game of Life rules
- `src/context/GameContext.tsx` — Global state/context

## Credits
- Built with [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
- UI icons by [Lucide](https://lucide.dev/)
- Patterns inspired by [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)


