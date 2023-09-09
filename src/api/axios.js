import axios from 'axios';

const SERVER_URL = 'https://white-rabbit-slip.cyclic.app';
// SERVER_URL ||
export default axios.create({
    baseURL:  'http://localhost:5000' 
 });

