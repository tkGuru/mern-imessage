import Chat from '../model/chatModel.js';

export const createNewChat = (req, res) => {
  const newChat = req.body;

  Chat.create(newChat, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
};

export const sendMessage = (req, res) => {
  Chat.update(
    { _id: req.query.id },
    { $push: { chats: req.body } },
    (err, data) => {
      if (err) {
        console.error(`Error (${err}) occured during saving message...`);
      } else {
        res.status(201).send(data);
      }
    }
  );
};

export const getChatList = (req, res) => {
  Chat.find((err, data) => {
    if (err) res.status(500).send(err);
    else {
      data.sort((a, b) => {
        return b.timestamp - a.timestamp;
      });

      let chats = [];

      data.map((chatData) => {
        const chatInfo = {
          id: chatData._id,
          name: chatData.chatName,
          timestamp: chatData.chats[0].timestamp,
        };

        chats.push(chatInfo);
      });

      res.status(200).send(chats);
    }
  });
};

export const getChat = (req, res) => {
  const id = req.query.id;

  Chat.find({ _id: id }, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
};

export const getLastMessage = (req, res) => {
  const id = req.query.id;

  Chat.find({ _id: id }, (err, data) => {
    if (err) res.status(500).send(err);
    else {
      let chatData = data[0].chats;

      chatData.reverse();
      res.status(200).send(chatData[0]);
    }
  });
};
