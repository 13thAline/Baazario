// backend/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  groupOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'GroupOrder', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', MessageSchema);