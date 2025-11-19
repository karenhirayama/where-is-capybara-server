import { Request, Response } from "express";

import { GameModel } from "../models/gameModel";

import { capybaraBounds } from "../helpers/capybaraBounds";
import { isWithinBounds } from "../helpers/coordinateUtils";

export const GameController = {
  async startGame(req: Request, res: Response) {
    try {
      const { sessionId } = req.body;

      if (!sessionId) {
        return res.status(400).json({ message: "Session id is required" });
      }

      const gameSession = await GameModel.create(sessionId);

      res.status(201).json({
        success: true,
        data: { session: gameSession },
        message: "Game session started",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to start game session",
      });
    }
  },

  async validatePostion(req: Request, res: Response) {
    try {
      const { clickY, clickX, sessionId } = req.body;

      if (clickY === undefined || clickX === undefined) {
        return res.status(400).json({
          success: false,
          error: "Missing required fields",
        });
      }

      const isCorrect = isWithinBounds(clickY, clickX, capybaraBounds);

      if (!isCorrect) {
        return res.status(200).json({
          success: true,
          data: { found: false },
          message: "Capybara not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: { found: true },
        message: "Capybara found!",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to validate position",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  },

  async completeGame(req: Request, res: Response) {
    try {
      const { sessionId } = req.body;

      if (!sessionId) {
        return res.status(400).json({ message: "Session id is required" });
      }

      const completedSession = await GameModel.complete(sessionId);
      const timeTaken = await GameModel.calculateTimeTaken(sessionId);

      if (!timeTaken) {
        return res.status(400).json({
          success: false,
          error: "Could not calculate game time",
        });
      }

      res.status(200).json({
        success: true,
        data: { session: completedSession, timeTaken },
        message: "Game session completed",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to complete game session",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  },
};
