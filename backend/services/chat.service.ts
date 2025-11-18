import { mongoConn } from '../database/prisma';
import type { ChatMessage }from '../database/generated/mongodb/client';


const createMessage = async (message: ChatMessage) => {
    return await mongoConn.chatMessage.create({
        data: message
    });
};

const getMessages = async (clubId: number, teamId?: number | null, limit: number = 50, cursor?: string) => {
    return await mongoConn.chatMessage.findMany({	
		take: limit,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
        where: {
            clubId: clubId,
            teamId: teamId, 
        },
        orderBy: { createdAt: 'desc' }, // Mais antigas primeiro
    
    });
};




export default {
    createMessage,
    getMessages,
};