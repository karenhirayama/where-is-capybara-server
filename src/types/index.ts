export interface GameSession {
    id: string;
    startDate: Date;
    endDate: Date | null;
    completed: boolean;
    sessionId: string;
}