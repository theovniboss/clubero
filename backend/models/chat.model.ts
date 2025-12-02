export interface ChatMessage {
	id?: string;
	createdAt: Date;
	content: string;
	clubId: number;
	teamId?: number | null;
	userId: string;
	userName: string;
}