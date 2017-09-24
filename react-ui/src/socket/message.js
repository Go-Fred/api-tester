import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:5000');
function subscribeToMessagePayload(cb) {
  socket.on('message', data => cb(data));
}
export { subscribeToMessagePayload };
