import type { Request, Response, NextFunction } from 'express';
import chatService from '../services/chat.service';
import teamService from '../services/team.service';
import clubService from '../services/club.service';
import type { ChatMessage } from '../models/chat.model';

/**
 * Busca o histórico de mensagens de uma sala de chat (clube ou time).
 */
const getMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { clubId, teamId } = req.query;
        if (!clubId) {
            return res.status(400).json({ message: 'clubId is required' });
        }

        const clubIdNum = parseInt(clubId as string, 10);
        const teamIdNum = teamId ? parseInt(teamId as string, 10) : null;
        const messages = await chatService.getMessages(clubIdNum, teamIdNum);

        res.json(messages);
    } catch (error) {
        next(error);
    }
};

const createMessage = async (message: ChatMessage): Promise<ChatMessage> => {
	return await chatService.createMessage(message)
}

const canUserJoinChatRoom = async (userId: string, clubId: number, teamId: number | null): Promise<boolean> => {
    const isAuthorized = teamId != null ? await teamService.isUserInTeam(userId, teamId) : await clubService.isUserInClub(userId, clubId);
	return isAuthorized
};

export default {
    getMessages,
	createMessage,
	canUserJoinChatRoom
};