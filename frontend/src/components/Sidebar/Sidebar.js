import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import axios from '../../utils/axios';
import Pusher from 'pusher-js';
import { auth } from '../../firebase';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat/SidebarChat';
import './Sidebar.css';

const pusher = new Pusher('e17d5f5f04c64f6dbcfa', {
  cluster: 'us2',
});

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  const getChats = () => {
    axios.get('/api/chat/chatList').then((res) => {
      setChats(res.data);
    });
  };

  useEffect(() => {
    getChats();

    const channel = pusher.subscribe('chats');
    channel.bind('newChat', function (data) {
      getChats();
    });
  }, []);

  const addChat = () => {
    const chatName = prompt('Please enter a chat name!');
    const firstMsg = prompt('Please send a first message!');

    const date = new Date();

    if (chatName && firstMsg) {
      let chatId = '';

      axios
        .post('/api/chat/newChat', {
          chatName,
        })
        .then((res) => {
          chatId = res.data._id;
        })
        .then(() => {
          axios.post(`/api/chat/newMessage?id=${chatId}`, {
            message: firstMsg,
            timestamp: date.toLocaleString(),
            user,
          });
        });
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar__header'>
        <Avatar
          className='sidebar__avatar'
          src={user.photo}
          onClick={() => auth.signOut()}
        />

        <div className='sidebar__input'>
          <SearchIcon />
          <input placeholder='Search' />
        </div>

        <IconButton
          variant='outlined'
          className='sidebar__inputButton'
          onClick={addChat}
        >
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>

      <div className='sidebar__chats'>
        {chats.map(({ id, name, timestamp }) => (
          <SidebarChat key={id} id={id} chatName={name} timestamp={timestamp} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
