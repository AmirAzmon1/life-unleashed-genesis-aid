
# Conway's Game of Life - AI-Assisted Implementation

This is a fully functional implementation of Conway's Game of Life built using Lovable, an AI-assisted development tool. The application features a modern React interface with comprehensive controls and pattern library.

## 🎮 How to View/Run

**Option 1: Online (Recommended)**
- Visit the live application at: [Your Lovable Project URL]
- The app runs directly in your browser - no installation required!

**Option 2: Local Development**
If you want to run locally:
```bash
git clone [your-repo-url]
cd [project-name]
npm install
npm run dev
```

## ✨ Features

### Core Functionality
- **40x40 Grid (Adjustable)**: Default 40x40 grid with ability to change size (10-100)
- **Simulation Controls**: Start/stop the cellular automata simulation
- **Cell Editing**: Click individual cells to toggle alive/dead when simulation is stopped
- **Speed Control**: Adjust simulation speed from 1% to 100%
- **Grid Operations**: Randomize or clear the entire grid
- **Generation Counter**: Track how many generations have passed

### Pattern Library
Pre-loaded with 8 classic Game of Life patterns:
- **Glider**: Simple moving pattern
- **Blinker**: Basic oscillator
- **Beacon**: Period-2 oscillator
- **Toad**: Another period-2 oscillator
- **Pulsar**: Large period-3 oscillator
- **Gosper Gun**: Famous glider-producing pattern
- **Pentadecathlon**: Period-15 oscillator
- **Lightweight Spaceship**: Moving spaceship pattern

### Bonus Features
- **Save/Restore States**: Save current board state to local storage and restore later
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Smooth animations and hover effects
- **Toast Notifications**: User feedback for all actions

## 🎯 Game Rules

Conway's Game of Life follows these simple rules:
1. **Underpopulation**: Live cells with < 2 neighbors die
2. **Survival**: Live cells with 2-3 neighbors survive
3. **Overpopulation**: Live cells with > 3 neighbors die
4. **Reproduction**: Dead cells with exactly 3 neighbors become alive

## 🎨 Interface

The application features:
- **Dark Theme**: Easy on the eyes with green cellular highlights
- **Grid Visualization**: Interactive cells with hover effects
- **Control Panel**: All controls organized in an intuitive sidebar
- **Pattern Library**: Quick access to famous patterns
- **Real-time Updates**: Live generation counter and status display

## 🏗️ Technical Implementation

- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling with custom animations
- **Shadcn/UI**: High-quality UI components
- **Local Storage**: Persistent state saving/loading
- **Modular Architecture**: Clean separation of logic and UI

## 🚀 Getting Started

1. Open the application
2. Use the **Pattern Library** to load a classic pattern (try "Glider" first!)
3. Click **Start** to begin the simulation
4. Adjust **Speed** to see evolution at your preferred pace
5. **Stop** the simulation to manually edit cells
6. Experiment with **Randomize** for unexpected patterns
7. Use **Save State** to preserve interesting configurations

This implementation demonstrates the power of AI-assisted development while showcasing one of the most famous cellular automata in computer science!
