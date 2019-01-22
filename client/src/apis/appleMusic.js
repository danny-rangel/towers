import axios from 'axios';
const AuthStr = 'Bearer ' + process.env.REACT_APP_APPLE_DEV_KEY;


export default axios.create({
    baseURL: 'https://api.music.apple.com/v1/catalog/us',
    headers: { Authorization: AuthStr } 
});

