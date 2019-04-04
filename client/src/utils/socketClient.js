import io from 'socket.io-client';

let URL = "";

if (process.env.NODE_ENV === 'production') {
    URL = `https://towersmusic.io:${process.env.PORT}`;
  } else if (process.env.NODE_ENV !== 'production') {
    URL = '/';
  }

const socket = io.connect(URL);

export default socket;