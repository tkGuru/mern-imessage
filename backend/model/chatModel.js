import mongoose from 'mongoose';

const imessageSchema = mongoose.Schema({
  chatName: String,

  chats: [
    {
      message: String,
      timestamp: String,
      user: {
        displayName: String,
        email: String,
        photo: String,
        uid: String,
      },
    },
  ],
});

const Chat = mongoose.model('Chat', imessageSchema);

export default Chat;
