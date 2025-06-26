import React from 'react';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';
import { GameState } from '../types/game';

interface GameControlsProps {
  gameState: GameState;
  score: number;
  highScore: number;
  onStart: () => void;
  onPause: () => void;
  onRestart: () => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  score,
  highScore,
  onStart,
  onPause,
  onRestart
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {/* Score Display */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 shadow-xl border border-gray-600">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-sm text-gray-400">Score</div>
          </div>
          <div className="text-center flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-yellow-400">{highScore}</div>
              <div className="text-sm text-gray-400">Best</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-3">
        {gameState === 'idle' && (
          <button
            onClick={onStart}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Play className="w-5 h-5" />
            <span>Start Game</span>
          </button>
        )}
        
        {gameState === 'playing' && (
          <button
            onClick={onPause}
            className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </button>
        )}
        
        {gameState === 'paused' && (
          <button
            onClick={onStart}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Play className="w-5 h-5" />
            <span>Resume</span>
          </button>
        )}
        
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-4 border border-blue-800/50">
        <h3 className="text-white font-semibold mb-2">Controls</h3>
        <div className="text-sm text-gray-300 space-y-1">
          <div>• Arrow keys or WASD to move</div>
          <div>• SPACE to pause/resume</div>
          <div>• ESC to restart</div>
        </div>
      </div>
    </div>
  );
};