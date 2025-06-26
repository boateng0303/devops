import { useState, useEffect, useCallback, useRef } from 'react';
import { Position, Direction, GameState } from '../types/game';
import {
  GRID_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  generateFood,
  moveSnake,
  checkCollision,
  checkFoodCollision,
  growSnake,
  isOppositeDirection,
  calculateSpeed
} from '../utils/gameLogic';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(generateFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('snakeHighScore') || '0');
  });
  
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameState('idle');
    directionRef.current = INITIAL_DIRECTION;
    
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score.toString());
    }
  }, [score, highScore]);

  const changeDirection = useCallback((newDirection: Direction) => {
    if (gameState === 'playing' && !isOppositeDirection(directionRef.current, newDirection)) {
      setDirection(newDirection);
      directionRef.current = newDirection;
    }
  }, [gameState]);

  const gameLoop = useCallback(() => {
    setSnake(currentSnake => {
      const newSnake = moveSnake(currentSnake, directionRef.current);
      
      if (checkCollision(newSnake)) {
        gameOver();
        return currentSnake;
      }
      
      if (checkFoodCollision(newSnake, food)) {
        const grownSnake = growSnake(newSnake);
        setFood(generateFood(grownSnake));
        setScore(prev => prev + 10);
        return grownSnake;
      }
      
      return newSnake;
    });
  }, [food, gameOver]);

  // Game loop effect
  useEffect(() => {
    if (gameState === 'playing') {
      const speed = calculateSpeed(score);
      gameLoopRef.current = setInterval(gameLoop, speed);
      
      return () => {
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      };
    }
  }, [gameState, gameLoop, score]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          changeDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          changeDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          event.preventDefault();
          changeDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          event.preventDefault();
          changeDirection('RIGHT');
          break;
        case ' ':
          event.preventDefault();
          if (gameState === 'playing') {
            pauseGame();
          } else if (gameState === 'paused') {
            startGame();
          }
          break;
        case 'Escape':
          event.preventDefault();
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, changeDirection, startGame, pauseGame, resetGame]);

  return {
    gameState,
    snake,
    food,
    score,
    highScore,
    startGame,
    pauseGame,
    resetGame,
    changeDirection
  };
};