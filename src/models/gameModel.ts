import pool from "../config/database";

import { GameSession } from "../types";

export const GameModel = {
    async create(sessionId: string): Promise<GameSession> {
        const result = await pool.query(
            'INSERT INTO game_sessions (session_id, start_time) VALUES ($1, $2) RETURNING *',
            [sessionId, new Date()]
        )
        return result.rows[0];
    }
}