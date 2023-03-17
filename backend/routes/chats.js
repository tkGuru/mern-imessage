import express from 'express';
import {
  createNewChat,
  sendMessage,
  getChatList,
  getChat,
  getLastMessage,
} from '../controllers/chats.js';

const router = express.Router();

router.get('/', getChat);

router.post('/newChat', createNewChat);

router.post('/newMessage', sendMessage);

router.get('/chatList', getChatList);

router.get('/lastMessage', getLastMessage);

export default router;
