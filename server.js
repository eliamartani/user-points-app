// Expres
const app = require('express')();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;

// Socket.io
const io = require('socket.io')(server);

// Next.js
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connection', socket => {
  socket.on('message', ({ room, user, message }) => {
    if (!room) {
      throw new Error('[message] Room is missing');
    }

    socket.broadcast.emit(`message:${room}`, { message, user });
  });

  socket.on('clear', room => {
    if (!room) {
      throw new Error('[clear] Room is missing');
    }

    socket.broadcast.emit(`clear:${room}`);
  });
});

nextApp.prepare().then(() => {
  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(port, err => {
    if (err) throw err;

    console.log(
      `> Ready on https://localhost:${port} / http://localhost:${port}`
    );
  });
});
