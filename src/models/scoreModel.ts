import { Score } from "../types";

import pool from "../config/database";

export const ScoreModel = {
  async create(
    playerName: string,
    timeTaken: number,
    gameSessionId: string
  ): Promise<Score> {
    try {
      const result = await pool.query(
        "INSERT INTO scores (player_name, time_taken, game_session_id) VALUES ($1, $2, $3) RETURNING *",
        [playerName, timeTaken, gameSessionId]
      );

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed in create score: ${error}`);
    }
  },

  async getScores(): Promise<Score[]> {
    try {
      const result = await pool.query(
        "SELECT player_name, time_taken, created_at FROM scores ORDER BY time taken ASC"
      );

      return result.rows;
    } catch (error) {
      throw new Error(`Failed in get scores: ${error}`);
    }
  },

  async findPlayerName(playerName: string): Promise<Score | null> {
    try {
      const result = await pool.query(
        "SELECT * FROM scores WHERE player_name = $1",
        [playerName]
      );

      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed in find player name: ${error}`);
    }
  },
};
