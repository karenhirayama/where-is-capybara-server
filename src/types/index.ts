export interface GameSession {
  id: string;
  startDate: Date;
  endDate: Date | null;
  completed: boolean;
  sessionId: string;
}

export interface Score {
  id: string;
  playerName: string;
  timeTaken: number;
  gameSessionId: string;
  createdAt: Date;
}

export interface Bounds {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
