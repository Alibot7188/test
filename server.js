const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static('public'));

// Socket‑based signaling
io.on('connection', socket => {
  socket.on('join-room', roomId => {
    socket.join(roomId);
    // tell others in room a new user joined
    socket.to(roomId).emit('user-joined', socket.id);

    // relay signaling data
    socket.on('signal', ({ to, data }) => {
      io.to(to).emit('signal', { from: socket.id, data });
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-left', socket.id);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
