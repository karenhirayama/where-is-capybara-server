export interface GameSession {
  id: string;
  startTime: Date;
  endTime: Date | null;
  isCompleted: boolean;
  sessionId: string;
}

export interface IGameSession {
  id: string;
  start_time: Date;
  end_time: Date | null;
  is_completed: boolean;
  session_id: string;
}

export interface Score {
  id: string;
  playerName: string;
  timeTaken: number;
  gameSessionId: string;
  createdAt: Date;
}

export interface Bounds {
  x: number;
  y: number;
}

export interface NormalizedCoordinates {
  normalizedX: number;
  normalizedY: number;
}
