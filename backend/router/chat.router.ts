import { Router } from 'express';
import chatController from '../controllers/chat.controller';

const chatRouter = Router();

chatRouter.get('/chat/messages', chatController.getMessages);

export default chatRouter;