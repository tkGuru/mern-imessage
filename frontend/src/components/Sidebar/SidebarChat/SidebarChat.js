import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useDispatch } from 'react-redux';
import axios from '../../../utils/axios';
import { setChat } from '../../../features/chatSlice';
import * as timeago from 'timeago.js';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';

const pusher = new Pusher('e17d5f5f04c64f6dbcfa', {
  cluster: 'us2',
});

const SidebarChat = ({ id, chatName }) => {
  const dispatch = useDispatch();

  const [chatInfo, setChatInfo] = useState({
    lastMessage: '',
    lastPhoto: '',
    lastTimestamp: '',
  });

  const getSidebarElement = () => {
    axios.get(`/api/chat/lastMessage?id=${id}`).then((res) => {
      setChatInfo({
        lastMessage: res.data.message,
        lastPhoto: res.data.user.photo,
        lastTimestamp: res.data.timestamp,
      });
    });
  };

  useEffect(() => {
    getSidebarElement();

    const channel = pusher.subscribe('messages');
    channel.bind('newMessage', function (data) {
      getSidebarElement();
    });
  }, [id]);

  return (
    <div
      onClick={() => {
        dispatch(
          setChat({
            chatId: id,
            chatName,
          })
        );
      }}
      className='sidebarChat'
    >
      <Avatar src={chatInfo.lastPhoto} />

      <div className='sidebarChat__info'>
        <h3>{chatName}</h3>
        <p>{chatInfo.lastMessage}</p>
        <small>{timeago.format(chatInfo.lastTimestamp)}</small>
      </div>
    </div>
  );
};

export default SidebarChat;
