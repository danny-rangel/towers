import io from 'socket.io-client';

let URL = "";

if (process.env.NODE_ENV === 'production') {
    URL = `https://towersmusic.io/${process.env.PORT}`;
  } else if (process.env.NODE_ENV !== 'production') {
    URL = 'http://localhost:5000';
  }

const socket = io.connect(URL);

export default socket;