import io from 'socket.io-client';

let socket = io.connect('http://localhost:5000');

console.log('hi', socket);

export default socket;