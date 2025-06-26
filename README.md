# Snake Game

A beautiful, production-ready Snake game built with React, TypeScript, and Tailwind CSS.

## Features

- 🎮 Classic Snake gameplay with modern design
- 🎯 Progressive difficulty and speed increase
- 🏆 High score persistence
- ⌨️ Keyboard controls (Arrow keys, WASD, Space, Escape)
- 📱 Responsive design
- 🎨 Beautiful animations and micro-interactions

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Deployment

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t snake-game .

# Run the container
docker run -p 3000:8080 snake-game
```

### Using Docker Compose

```bash
# Production build
docker-compose up --build

# Development mode
docker-compose --profile dev up --build
```

The application will be available at:
- Production: http://localhost:3000
- Development: http://localhost:5173

### Docker Features

- **Multi-stage build**: Optimized for production with minimal image size
- **Security**: Runs as non-root user with security headers
- **Performance**: Nginx with gzip compression and static asset caching
- **Health checks**: Built-in health monitoring
- **Signal handling**: Proper process management with dumb-init

## Game Controls

- **Arrow Keys** or **WASD**: Move the snake
- **Space**: Pause/Resume game
- **Escape**: Restart game

## Architecture

The game is built with a modular architecture:

- `components/`: React components for UI
- `hooks/`: Custom React hooks for game logic
- `utils/`: Game logic and utilities
- `types/`: TypeScript type definitions

## Production Considerations

- Optimized bundle size with tree shaking
- Progressive Web App ready
- SEO optimized
- Performance monitoring ready
- Docker production deployment
- Security headers and best practices