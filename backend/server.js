const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import http and Socket.IO
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

// Create the HTTP server and Socket.IO server
const server = http.createServer(app);

// CORS configuration to allow both your Vercel frontend and local development
const allowedOrigins = [
  "http://localhost:5173",
  "https://baazario-final.vercel.app" // Your live Vercel URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"]
};

const io = new Server(server, {
  cors: corsOptions
});

// Middleware
app.use(cors(corsOptions)); // Use the detailed CORS options
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
app.use('/api/contact', require('./routes/contact'));

// Set up Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_order_room', (orderId) => {
    socket.join(orderId);
    console.log(`User ${socket.id} joined room ${orderId}`);
  });

  socket.on('send_message', (data) => {
    console.log('Message received on backend:', data);
    // Broadcast the message to all other clients in the same room
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server using server.listen
server.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));