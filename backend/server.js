import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Pusher from 'pusher';
import mongoose from 'mongoose';
import chatRoutes from './routes/chats.js';

// app config
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

export const pusher = new Pusher({
  appId: '1099335',
  key: 'e17d5f5f04c64f6dbcfa',
  secret: 'ad203b45aef52bcdd82a',
  cluster: 'us2',
  useTLS: true,
});

// middlewares
app.use(cors());
app.use(express.json());

// db config

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected');

  const changeStream = mongoose.connection.collection('chats').watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'insert') {
      pusher.trigger('chats', 'newChat', {
        change: change,
      });
    } else if (change.operationType === 'update') {
      pusher.trigger('messages', 'newMessage', {
        change: change,
      });
    } else {
      console.log('Error triggering Pusher...');
    }
  });
});

// api routes
app.get('/', (req, res) => res.status(200).send('Hello World'));

app.use('/api/chat', chatRoutes);

// server listen
app.listen(PORT, console.log(`Server running on port ${PORT}`));
