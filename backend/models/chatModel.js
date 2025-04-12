import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Chat = model('Chat', chatSchema);
export default Chat;