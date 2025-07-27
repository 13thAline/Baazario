// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// ## 1. Import http and Socket.IO ##
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

// ## 2. Create the HTTP server and Socket.IO server ##
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",
  "https://baazario-final.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"]
};

const io = new Server(server, {
  cors: corsOptions
});

app.use(cors(corsOptions));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error(err));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/catalog', require('./routes/catalog'));
app.use('/api/groups', require('./routes/groups'));
app.use('/api/group-orders', require('./routes/groupOrders'));

// ## 3. Set up Socket.IO connection logic ##
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join_order_room', (orderId) => {
    socket.join(orderId);
    console.log(`User ${socket.id} joined room ${orderId}`);
  });

  socket.on('send_message', (data) => {
    // In a real app, you would save the message to the Message model here
    console.log('Message received:', data);
    // Broadcast the message to the other user in the room
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// ## 4. Start the server using server.listen instead of app.listen ##
server.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));