import axios from 'axios';

const SERVER_URL = 'https://white-rabbit-slip.cyclic.app';

export default axios.create({
    baseURL: /*SERVER_URL ||*/ 'http://localhost:5000'
 });

