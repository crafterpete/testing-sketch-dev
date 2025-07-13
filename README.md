# Rolely.ai - Generative AI Fantasy Game

A web application that creates immersive fantasy worlds using AI, featuring a procedurally generated map and interactive game interface.

## Features

- **Procedural Fantasy Map**: Beautiful, interactive map with different terrain types (mountains, forests, water, plains, desert, magical realms)
- **AI-Powered Game**: Enter any world description and get an immersive first turn response
- **Real Coordinate System**: Each map location has real coordinates that can be explored
- **Responsive Design**: Works on desktop and mobile devices
- **Fantasy Styling**: Elegant UI with magical themes and animations

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom fantasy theme
- **Backend**: Node.js + Express + TypeScript
- **Map Generation**: Custom procedural generation algorithms

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

2. **Run the development servers**:
   ```bash
   npm run dev
   ```
   This will start both the client (port 3000) and server (port 3001)

3. **Access the application**:
   - Open your browser to `http://localhost:3000`
   - The backend API will be running on `http://localhost:3001`

## Usage

1. **Explore the Map**: Hover over different terrain types to see coordinates and elevation
2. **Start an Adventure**: Enter a world description in the text box (e.g., "a magical forest where time moves differently")
3. **Get AI Response**: Click "Start Adventure" to receive your first turn in the generated world

## Project Structure

```
/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── utils/          # Map generation utilities
│   │   └── index.css       # Tailwind styles
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Game logic
│   │   └── index.ts        # Server entry point
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

- `POST /api/game/start` - Start a new game with a world description
- `GET /health` - Health check endpoint

## Development

The application uses:
- Hot reload for both frontend and backend
- TypeScript for type safety
- Tailwind CSS for styling
- Procedural generation for unique maps on each reload

## Future Enhancements

- Integration with OpenAI or other AI services for better responses
- Persistent game sessions
- Character creation and progression
- Multiplayer support
- Save/load game functionality
