// backend/routes/groupOrders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const GroupOrder = require('../models/GroupOrder');
const CatalogItem = require('../models/CatalogItem');

// @route   POST /api/group-orders
// @desc    Create a new group order
router.post('/', auth, async (req, res) => {
  const { groupId, catalogItemId, maxQuantityPerMember } = req.body;
  try {
    const group = await Group.findById(groupId);
    const catalogItem = await CatalogItem.findById(catalogItemId);

    if (group.leader.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Only the group leader can create an order' });
    }

    const newOrder = new GroupOrder({
      group: groupId,
      catalogItem: catalogItemId,
      leader: req.user.id,
      supplier: catalogItem.supplier,
      maxQuantityPerMember,
    });
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/group-orders/group/:groupId
// @desc    Get all orders for a specific group
router.get('/group/:groupId', auth, async (req, res) => {
    try {
        const orders = await GroupOrder.find({ group: req.params.groupId, status: 'open' })
          .populate({
            path: 'catalogItem',
            model: 'CatalogItem' // Explicitly tell Mongoose which model to use
          })
          .populate({
            path: 'commitments.member',
            select: 'name' // Only select the 'name' field
          });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/group-orders/:orderId/commit
// @desc    Commit a quantity to an order
router.post('/:orderId/commit', auth, async (req, res) => {
    const { quantity } = req.body;
    try {
        const order = await GroupOrder.findById(req.params.orderId);
        if (quantity > order.maxQuantityPerMember) {
            return res.status(400).json({ msg: 'Quantity exceeds maximum allowed per member.' });
        }
        
        // Remove existing commitment if present
        order.commitments = order.commitments.filter(c => c.member.toString() !== req.user.id);
        
        // Add new commitment
        order.commitments.push({ member: req.user.id, quantity });
        
        await order.save();
        res.json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;