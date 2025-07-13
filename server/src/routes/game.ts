import express from 'express';
import { generateGameResponse } from '../services/gameService';

const router = express.Router();

router.post('/start', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const gameResponse = await generateGameResponse(prompt);
    
    res.json({
      success: true,
      response: gameResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Game start error:', error);
    res.status(500).json({ error: 'Failed to start game' });
  }
});

export { router as gameRouter };
