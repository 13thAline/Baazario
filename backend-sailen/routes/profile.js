// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// This route will be GET /api/profile/me
router.get('/me', auth, async (req, res) => {
  // This is a placeholder for fetching profile data from a Profile model
  // In a real app, you would have a Profile model linked to the User model.
  res.json({
    companyName: 'Example Cuttack Spices',
    phone: '123-456-7890',
    address: 'Bada Bazar, Cuttack, Odisha',
  });
});

// This route will be PUT /api/profile
router.put('/', auth, async (req, res) => {
  // In a real app, you would save req.body to the database.
  console.log('Profile update request received:', req.body);
  res.json({ msg: 'Profile updated successfully', profile: req.body });
});

module.exports = router;