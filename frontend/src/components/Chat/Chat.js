import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { selectChatId, selectChatName } from '../../features/chatSlice';
import axios from '../../utils/axios';
import Pusher from 'pusher-js';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import Message from '../Message/Message';
import './Chat.css';

const pusher = new Pusher('e17d5f5f04c64f6dbcfa', {
  cluster: 'us2',
});

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const user = useSelector(selectUser);
  const chatId = useSelector(selectChatId);
  const chatName = useSelector(selectChatName);

  const getChat = (chatId) => {
    if (chatId) {
      axios.get(`/api/chat?id=${chatId}`).then((res) => {
        setMessages(res.data[0].chats);
      });
    }
  };

  useEffect(() => {
    pusher.unsubscribe('messages');

    getChat(chatId);

    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', function (data) {
      getChat(chatId);
    });
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();

    const date = new Date();

    axios.post(`/api/chat/newMessage?id=${chatId}`, {
      message: input,
      timestamp: date.toLocaleString(),
      user: user,
    });

    setInput('');
  };

  return (
    <div className='chat'>
      <div className='chat__header'>
        <h4>
          To: <span className='chat__name'>{chatName}</span>
        </h4>
        <strong className='chat__details'>Details</strong>
      </div>

      <div className='chat__messages'>
        <FlipMove>
          {messages.map(({ user, _id, message, timestamp }) => (
            <Message
              key={_id}
              id={_id}
              sender={user}
              message={message}
              timestamp={timestamp}
            />
          ))}
        </FlipMove>
      </div>

      <div className='chat__input'>
        <form>
          <input
            type='text'
            placeholder='iMessage'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton>
          <MicNoneIcon className='chat__mic' />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
