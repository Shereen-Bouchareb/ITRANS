const WebSocket = require('ws');
const express = require('express');
const app = express();
const db = require('./modules/load_database'); // Adjust the path as needed

// Create HTTP server and associate it with the WebSocket server
const server = app.listen(8080, () => {
  console.log('Server listening on port 8080');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (data) => {
    try {
      const { latitude, longitude } = JSON.parse(data);
      console.log("latitude = " + latitude , "longitude=" + longitude ) ; 
      const station = db.findStation(latitude, longitude);

      if (station) {
        console.log("Station is detected");
        socket.send(JSON.stringify({ status: 'success', message: 'Station detected', station }));
      } else {
        console.log("Station is not found");
        socket.send(JSON.stringify({ status: 'error', message: 'Station not found' }));
      }
    } catch (error) {
      console.error('Error processing message:', error);
      socket.send(JSON.stringify({ status: 'error', message: 'Invalid data format' }));
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = app;
