import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import './Imessage.css';

const Imessage = () => {
  return (
    <div className='iMessage'>
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Imessage;
