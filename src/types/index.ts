export interface GameSession {
    id: string;
    createdAt: Date;
    endDate: Date | null;
    completed: boolean;
    sessionId: string;
}