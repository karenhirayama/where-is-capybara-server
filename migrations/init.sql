CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS game_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_name VARCHAR(255) NOT NULL,
    time_taken INTERVAL NOT NULL,
    game_session_id UUID REFERENCES game_sessions(id),
    created_at TIMESTAMP DEFAULT NOW()
);