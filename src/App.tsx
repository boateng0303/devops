import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { GameOverModal } from './components/GameOverModal';
import { useGameState } from './hooks/useGameState';
import { GRID_SIZE } from './utils/gameLogic';

function App() {
  const {
    gameState,
    snake,
    food,
    score,
    highScore,
    startGame,
    pauseGame,
    resetGame
  } = useGameState();

  const isNewHighScore = gameState === 'gameOver' && score > 0 && score === highScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 mb-2">
            Snake Game
          </h1>
          <p className="text-gray-300 text-lg">
            Classic arcade action with modern design
          </p>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Game Board */}
          <div className="lg:col-span-2 flex justify-center">
            <GameBoard
              gameState={gameState}
              snake={snake}
              food={food}
              gridSize={GRID_SIZE}
            />
          </div>

          {/* Game Controls */}
          <div className="lg:col-span-1">
            <GameControls
              gameState={gameState}
              score={score}
              highScore={highScore}
              onStart={startGame}
              onPause={pauseGame}
              onRestart={resetGame}
            />
          </div>
        </div>

        {/* Game Over Modal */}
        {gameState === 'gameOver' && (
          <GameOverModal
            score={score}
            highScore={highScore}
            isNewHighScore={isNewHighScore}
            onRestart={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;