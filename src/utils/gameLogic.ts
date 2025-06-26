import { Position, Direction } from '../types/game';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
export const INITIAL_DIRECTION: Direction = 'RIGHT';
export const INITIAL_SPEED = 150;

export const generateFood = (snake: Position[]): Position => {
  let food: Position;
  do {
    food = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
  } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  
  return food;
};

export const moveSnake = (snake: Position[], direction: Direction): Position[] => {
  const head = { ...snake[0] };
  
  switch (direction) {
    case 'UP':
      head.y -= 1;
      break;
    case 'DOWN':
      head.y += 1;
      break;
    case 'LEFT':
      head.x -= 1;
      break;
    case 'RIGHT':
      head.x += 1;
      break;
  }
  
  return [head, ...snake.slice(0, -1)];
};

export const checkCollision = (snake: Position[]): boolean => {
  const head = snake[0];
  
  // Check wall collision
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    return true;
  }
  
  // Check self collision
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
};

export const checkFoodCollision = (snake: Position[], food: Position): boolean => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};

export const growSnake = (snake: Position[]): Position[] => {
  return [...snake, snake[snake.length - 1]];
};

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
  }
};

export const isOppositeDirection = (current: Direction, new_direction: Direction): boolean => {
  return getOppositeDirection(current) === new_direction;
};

export const calculateSpeed = (score: number): number => {
  const level = Math.floor(score / 50);
  return Math.max(50, INITIAL_SPEED - (level * 10));
};