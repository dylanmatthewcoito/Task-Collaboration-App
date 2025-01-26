# Real-Time Task Collaboration App

A React-based task management application with simulated real-time collaboration features.

## Features
- Add, complete, and delete tasks
- Real-time updates using WebSocket simulation
- Responsive design with Tailwind CSS
- Component-based architecture
- Unit tests

## Project Structure
```
src/
  components/
    TaskForm.jsx
    TaskItem.jsx
  services/
    webSocket.js
  hooks/
    useWebSocket.js
  tests/
    TaskApp.test.js
  TaskApp.jsx
```

## Setup
1. Clone repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Run tests: `npm test`

## Architecture
- Components follow single responsibility principle
- Custom hooks abstract WebSocket logic
- Service layer manages WebSocket simulation
- Test coverage for core functionality

## Technologies
- React
- Tailwind CSS
- Lucide Icons
- Jest & Testing Library
- Mock WebSocket implementation

## Deployment
Deploy to Vercel or Netlify using their default React configuration.