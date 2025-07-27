// backend/models/CatalogItem.js
const mongoose = require('mongoose');

const CatalogItemSchema = new mongoose.Schema({
  supplier: { // Changed from 'vendor'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CatalogItem', CatalogItemSchema);