import React from 'react';
import { GameState, Position } from '../types/game';

interface GameBoardProps {
  gameState: GameState;
  snake: Position[];
  food: Position;
  gridSize: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ gameState, snake, food, gridSize }) => {
  const renderCell = (row: number, col: number) => {
    const isSnakeHead = snake[0]?.x === col && snake[0]?.y === row;
    const isSnakeBody = snake.slice(1).some(segment => segment.x === col && segment.y === row);
    const isFood = food.x === col && food.y === row;

    let cellClass = 'w-full h-full border border-gray-200/20 transition-all duration-200';
    
    if (isSnakeHead) {
      cellClass += ' bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 scale-95';
    } else if (isSnakeBody) {
      cellClass += ' bg-gradient-to-br from-emerald-300 to-emerald-500 scale-90';
    } else if (isFood) {
      cellClass += ' bg-gradient-to-br from-red-400 to-pink-500 shadow-lg shadow-red-500/40 scale-90 animate-pulse';
    } else {
      cellClass += ' bg-gray-800/40 hover:bg-gray-700/50';
    }

    return (
      <div key={`${row}-${col}`} className="aspect-square p-0.5">
        <div className={cellClass} />
      </div>
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
      <div 
        className="grid gap-0.5 mx-auto"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          maxWidth: '600px',
          aspectRatio: '1'
        }}
      >
        {Array.from({ length: gridSize }, (_, row) =>
          Array.from({ length: gridSize }, (_, col) => renderCell(row, col))
        )}
      </div>
      
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">PAUSED</div>
            <div className="text-gray-300">Press SPACE to resume</div>
          </div>
        </div>
      )}
    </div>
  );
};