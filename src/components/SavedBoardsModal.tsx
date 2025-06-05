import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SavedBoardsModalProps {
  open: boolean;
  onClose: () => void;
}

const SavedBoardsModal: React.FC<SavedBoardsModalProps> = ({ open, onClose }) => {
  const {
    getSavedStates,
    saveNamedState,
    loadNamedState,
    deleteNamedState,
  } = useGame();
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
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Saved Boards</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter board name..."
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            />
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Save</Button>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
        <div className="mt-4">
          {savedStates.length === 0 ? (
            <div className="text-gray-400 text-center">No saved boards yet.</div>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {savedStates.map(({ name, timestamp }, idx) => (
                <li key={name} className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
                  <div>
                    <div className="font-medium text-white">{name}</div>
                    <div className="text-xs text-gray-400">{new Date(timestamp).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => { loadNamedState(name); onClose(); }}>Load</Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteNamedState(name)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SavedBoardsModal; 