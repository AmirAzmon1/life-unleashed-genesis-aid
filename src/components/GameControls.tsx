import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlay, CircleStop, SquareX, Shuffle } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface GameControlsProps {
  isRunning: boolean;
  speed: number;
  gridSize: number;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onRandomize: () => void;
  onSpeedChange: (speed: number) => void;
  onGridSizeChange: (size: number) => void;
  generation: number;
  status: string;
}

const GameControls: React.FC<GameControlsProps> = ({
  isRunning,
  speed,
  gridSize,
  onStart,
  onStop,
  onClear,
  onRandomize,
  onSpeedChange,
  onGridSizeChange,
  generation,
  status
}) => {
  const { saveNamedState, getSavedStates, loadNamedState, deleteNamedState } = useGame();
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [error, setError] = useState('');
  const savedStates = getSavedStates();

  const handleSave = () => {
    if (!saveName.trim()) {
      setError('Please enter a name');
      return;
    }
    saveNamedState(saveName.trim());
    setSaveName('');
    setError('');
    setSaveModalOpen(false);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-green-400">Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Button
            onClick={isRunning ? onStop : onStart}
            className={`flex-1 py-2 text-base font-bold ${isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            size="lg"
          >
            {isRunning ? <CircleStop className="w-5 h-5 mr-2" /> : <CirclePlay className="w-5 h-5 mr-2" />}
            {isRunning ? 'Stop' : 'Start'}
          </Button>
          <Button
            onClick={onClear}
            variant="destructive"
            className="flex-1 py-2 text-base font-bold"
            size="lg"
          >
            <SquareX className="w-5 h-5 mr-2" />
            Clear
          </Button>
        </div>
        <Button
          onClick={onRandomize}
          className="w-full bg-blue-600 hover:bg-blue-700 text-base font-bold py-2 mb-4"
          size="lg"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          Randomize
        </Button>

        <div className="mb-4">
          <Label className="text-gray-400 text-sm mb-1 block">Speed: {speed}%</Label>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="mb-4">
          <Label className="text-gray-400 text-sm mb-1 block">Grid Size: {gridSize}x{gridSize}</Label>
          <Input
            type="number"
            value={gridSize}
            onChange={(e) => onGridSizeChange(Number(e.target.value))}
            min={10}
            max={100}
            className="w-full bg-gray-700 border-gray-600 text-white text-base px-3 py-2"
          />
        </div>

        <Button onClick={() => setSaveModalOpen(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-base font-bold py-2 mb-2" size="lg">
          Save State
        </Button>
        <Button onClick={() => setLoadModalOpen(true)} className="w-full bg-purple-600 hover:bg-purple-700 text-base font-bold py-2 mb-4" size="lg">
          Load State
        </Button>

        {/* Save Modal */}
        <Dialog open={saveModalOpen} onOpenChange={setSaveModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Save Board</DialogTitle>
            </DialogHeader>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Enter board name..."
                value={saveName}
                onChange={e => setSaveName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
              />
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Save</Button>
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <DialogFooter>
              <Button variant="outline" onClick={() => setSaveModalOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Load Modal */}
        <Dialog open={loadModalOpen} onOpenChange={setLoadModalOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Load Board</DialogTitle>
            </DialogHeader>
            <div className="mt-2">
              {savedStates.length === 0 ? (
                <div className="text-gray-400 text-center">No saved boards yet.</div>
              ) : (
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {savedStates.map(({ name, timestamp }) => (
                    <li key={name} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                      <div>
                        <div className="font-medium text-white">{name}</div>
                        <div className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => { loadNamedState(name); setLoadModalOpen(false); }}>Load</Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteNamedState(name)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setLoadModalOpen(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="text-sm text-gray-400 space-y-1">
          <div>Generation: {generation}</div>
          <div>Status: <span className={isRunning ? 'text-green-400' : 'text-red-400'}>{status}</span></div>
          <div className="text-xs">Click cells to toggle when stopped</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControls; 