import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});
instance.defaults.timeout=300000;
instance.defaults.headers.put['Content-Type'] = 'application/json';
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.delete['Content-Type'] = 'application/json';

export default instance;