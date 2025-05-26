
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

interface Pattern {
  name: string;
  description: string;
  pattern: number[][];
}

interface PatternLibraryProps {
  onPatternLoad: (pattern: number[][]) => void;
}

const patterns: Pattern[] = [
  {
    name: "Glider",
    description: "A simple moving pattern",
    pattern: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1]
    ]
  },
  {
    name: "Blinker",
    description: "Oscillates between horizontal and vertical",
    pattern: [
      [1, 1, 1]
    ]
  },
  {
    name: "Beacon",
    description: "A period-2 oscillator",
    pattern: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ]
  },
  {
    name: "Toad",
    description: "Another period-2 oscillator",
    pattern: [
      [0, 1, 1, 1],
      [1, 1, 1, 0]
    ]
  },
  {
    name: "Pulsar",
    description: "A large period-3 oscillator",
    pattern: [
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
    ]
  },
  {
    name: "Gosper Gun",
    description: "A glider gun that produces gliders",
    pattern: [
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
  },
  {
    name: "Pentadecathlon",
    description: "A period-15 oscillator",
    pattern: [
      [1,1,1,1,1,1,1,1]
    ]
  },
  {
    name: "Lightweight Spaceship",
    description: "A small moving spaceship",
    pattern: [
      [1,0,0,1,0],
      [0,0,0,0,1],
      [1,0,0,0,1],
      [0,1,1,1,1]
    ]
  }
];

const PatternLibrary: React.FC<PatternLibraryProps> = ({ onPatternLoad }) => {
  const handlePatternLoad = (pattern: Pattern) => {
    onPatternLoad(pattern.pattern);
    toast({
      title: "Pattern Loaded",
      description: `${pattern.name} has been loaded onto the grid`,
    });
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-blue-400">Pattern Library</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-2">
            {patterns.map((pattern, index) => (
              <div key={index} className="space-y-1">
                <Button
                  onClick={() => handlePatternLoad(pattern)}
                  className="w-full justify-start bg-gray-700 hover:bg-gray-600 text-left p-3 h-auto"
                >
                  <div>
                    <div className="font-medium text-white">{pattern.name}</div>
                    <div className="text-xs text-gray-400">{pattern.description}</div>
                  </div>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PatternLibrary;
