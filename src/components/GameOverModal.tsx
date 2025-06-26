import React from 'react';
import { Trophy, RotateCcw, Star } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  highScore: number;
  isNewHighScore: boolean;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  highScore,
  isNewHighScore,
  onRestart
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-600 max-w-md w-full animate-in zoom-in-95 duration-300">
        <div className="text-center">
          {isNewHighScore ? (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-4 animate-bounce">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                New High Score!
              </h2>
            </div>
          ) : (
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Game Over</h2>
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-xl p-4">
              <div className="text-4xl font-bold text-white">{score}</div>
              <div className="text-gray-300">Final Score</div>
            </div>
            
            {!isNewHighScore && (
              <div className="bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 rounded-xl p-3 border border-yellow-700/50">
                <div className="flex items-center justify-center space-x-2 text-yellow-400">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Best: {highScore}</span>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};