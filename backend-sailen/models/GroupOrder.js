// backend/models/GroupOrder.js
const mongoose = require('mongoose');

const GroupOrderSchema = new mongoose.Schema({
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  catalogItem: { type: mongoose.Schema.Types.ObjectId, ref: 'CatalogItem', required: true },
  leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  maxQuantityPerMember: { type: Number, required: true },
  commitments: [
    {
      member: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      quantity: { type: Number },
    }
  ],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GroupOrder', GroupOrderSchema);