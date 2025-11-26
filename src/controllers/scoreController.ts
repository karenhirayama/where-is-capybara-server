import { Request, Response } from "express";

import { GameModel } from "../models/gameModel";
import { ScoreModel } from "../models/scoreModel";

export const ScoreController = {
  async submitScore(req: Request, res: Response) {
    try {
      const { sessionId, playerName } = req.body;

      if (!sessionId || !playerName) {
        return res
          .status(400)
          .json({ success: false, error: "Missing required fields" });
      }

      const existingPlayer = await ScoreModel.findPlayerName(playerName);

      if (existingPlayer) {
        return res
          .status(400)
          .json({ success: false, error: "Player name already exists" });
      }

      const gameSession = await GameModel.findBySessionId(sessionId);

      if (!gameSession || !gameSession.is_completed) {
        return res.status(400).json({
          success: false,
          error: "Game session is not completed or does not exist",
        });
      }

      const existingScore = await ScoreModel.findByGameSessionId(gameSession.id);

      if (existingScore) {
        return res
          .status(400)
          .json({ success: false, error: "Score already submitted for this game session" });
      }

      const timeTaken = await GameModel.calculateTimeTaken(sessionId);

      if (!timeTaken) {
        return res
          .status(500)
          .json({ success: false, error: "Failed to calculate time taken" });
      }

      await ScoreModel.create(playerName, timeTaken, gameSession.id);

      const scores = await ScoreModel.getScores();

      res.status(201).json({
        success: true,
        data: { scores },
        message: "Score submitted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to submit score",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
