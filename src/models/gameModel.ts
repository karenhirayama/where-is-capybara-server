import pool from "../config/database";

import { GameSession } from "../types";

export const GameModel = {
  async create(sessionId: string): Promise<GameSession> {
    try {
      const result = await pool.query(
        "INSERT INTO game_sessions (session_id, start_time) VALUES ($1, $2) RETURNING *",
        [sessionId, new Date()]
      );

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed in create session: ${error}`);
    }
  },

  async complete(sessionId: string): Promise<GameSession> {
    try {
      const result = await pool.query(
        "UPDATE game_sessions SET end_time = $1, is_completed = true WHERE session_id = $2 RETURNING *",
        [new Date(), sessionId]
      );

      if (!result.rows[0]) {
        throw new Error(`Session with id ${sessionId} not found`);
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Failed in complete session: ${error}`);
    }
  },

  async findBySessionId(sessionId: string): Promise<GameSession> {
    try {
      const result = await pool.query(
        "SELECT * FROM game_sessions WHERE session_id = $1",
        [sessionId]
      );

      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed in find by session id: ${error}`);
    }
  },

  async calculateTimeTaken(sessionId: string): Promise<number> {
    try {
      const session = await this.findBySessionId(sessionId);

      if (!session) {
        throw new Error(`Session with id ${sessionId} not found`);
      }

      if (!session.endDate) {
        throw new Error("Session is not completed yet");
      }

      const start = new Date(session.startDate).getTime();
      const end = new Date(session?.endDate).getTime();

      return Math.floor((end - start) / 1000);
    } catch (error) {
      throw new Error(`Failed in calculate time taken: ${error}`);
    }
  },
};
