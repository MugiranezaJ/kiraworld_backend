import axios from 'axios'

// const token = localStorage.getItem('chat_access_token'); 
const token = 'FLWSECK_TEST-SANDBOXDEMOKEY-X'
const config = axios.create({
    // baseURL: process.env.REACT_APP_BACKEND_BASE_URL
    baseURL:"https://api.flutterwave.com/v3/"
})
config.defaults.headers.common['Authorization'] = `Bearer ${token}`;
config.defaults.headers.post['Content-Type'] ='application/json';

export default config;