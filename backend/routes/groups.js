// backend/routes/groups.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Group = require('../models/Group');
const Invitation = require('../models/Invitation');
const User = require('../models/User');

// @route   POST api/groups
// @desc    Create a group and send invitations
router.post('/', auth, async (req, res) => {
  const { name, inviteeEmails } = req.body;
  try {
    const leaderId = req.user.id;
    const newGroup = new Group({
      name,
      leader: leaderId,
      members: [leaderId], // The leader is automatically a member
    });
    const group = await newGroup.save();

    // Create invitations for each email
    if (inviteeEmails && inviteeEmails.length > 0) {
      const invitations = inviteeEmails.map(email => ({
        group: group._id,
        sender: leaderId,
        recipientEmail: email,
      }));
      await Invitation.insertMany(invitations);
    }
    res.status(201).json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/groups/invitations
// @desc    Get pending invitations for the logged-in user
router.get('/invitations', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const invitations = await Invitation.find({
      recipientEmail: user.email,
      status: 'pending',
    }).populate('group', 'name').populate('sender', 'name');
    res.json(invitations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/groups/invitations/:inviteId/accept
// @desc    Accept a group invitation
router.post('/invitations/:inviteId/accept', auth, async (req, res) => {
    try {
        const invite = await Invitation.findById(req.params.inviteId);
        if (!invite) return res.status(404).json({ msg: 'Invitation not found' });

        // Update invitation status
        invite.status = 'accepted';
        await invite.save();

        // Add user to the group members
        await Group.findByIdAndUpdate(invite.group, { $addToSet: { members: req.user.id } });
        
        res.json({ msg: 'Invitation accepted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/my-groups', auth, async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user.id })
            .populate('leader', 'name')
            .populate('members', 'name')
            .sort({ createdAt: -1 });
        res.json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;