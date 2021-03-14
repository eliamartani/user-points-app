// Expres
const app = require('express')();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;

// Socket.io
const socketio = require('socket.io');

// Next.js
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const io = new socketio.Server();

  io.attach(server);

  app.get('*', (req, res) => nextHandler(req, res));

  io.on('connection', socket => {
    socket.on('message', ({ room, user, message }) => {
      if (!room) {
        throw new Error('[message] Room is missing');
      }

      socket.broadcast.emit(`message:${room}`, { message, user });
    });

    // Not imlpemented yet
    socket.on('clear', room => {
      if (!room) {
        throw new Error('[clear] Room is missing');
      }

      socket.broadcast.emit(`clear:${room}`);
    });
  });

  server.listen(port, err => {
    if (err) throw err;

    console.log(
      `> Ready on https://localhost:${port} / http://localhost:${port}`
    );
  });
});
