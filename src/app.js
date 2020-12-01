import express from 'express';
import socketio from 'socket.io';

import dotEnv from 'dotenv';

import {countShipments} from './getShipments';

import cors from 'cors';


dotEnv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;
let counter = 0;


const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

const io = socketio(httpServer);

(async () => {
  counter = await countShipments();
  io.emit('counter', counter)
})();

(() => {
  setInterval(async () => {
    counter = await countShipments();
    io.emit('counter', counter)
  }, 1500);
})()

io.on('connection', (socket) => {
  io.emit('counter', counter)
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/* app.post('/webhook/shipments', ({res}) => {
  io.emit('counter', ++counter);

  res.status(200).send();
})*/