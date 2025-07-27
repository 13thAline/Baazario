// backend/routes/catalog.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CatalogItem = require('../models/CatalogItem');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, 'item-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('itemImage'); // 'itemImage' is the name of the form field

// @route   POST api/catalog
// @desc    (Supplier) Add a new catalog item with image upload
// @access  Private
router.post('/', auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err });
    }
    if (req.file == undefined) {
      return res.status(400).json({ msg: 'Error: No File Selected!' });
    }

    const { name, quantity } = req.body;
    try {
      const newItem = new CatalogItem({
        name,
        quantity,
        imageUrl: `/uploads/${req.file.filename}`, // Save the path to the file
        supplier: req.user.id,
      });
      const item = await newItem.save();
      res.json(item);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
});

// ... your GET routes remain the same ...
router.get('/my-items', auth, async (req, res) => {
  try {
    const items = await CatalogItem.find({ supplier: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const items = await CatalogItem.find().populate('supplier', 'name').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await CatalogItem.findById(req.params.id);

    // Check if item exists
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    // Check if the user owns the item
    if (item.supplier.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Delete the image file from the server
    const imagePath = path.join(__dirname, '..', item.imageUrl);
    fs.unlink(imagePath, (err) => {
      if (err) console.error(`Failed to delete image file: ${imagePath}`, err);
    });

    // Remove the item from the database
    await item.deleteOne(); // Mongoose v6+
    
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;