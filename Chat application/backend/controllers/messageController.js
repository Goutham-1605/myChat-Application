const Message = require('../models/messageModel');

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sender', 'username');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

const createMessage = async (req, res) => {
  try {
    const { senderId, text } = req.body;
    const newMessage = new Message({ sender: senderId, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { getAllMessages, createMessage };
