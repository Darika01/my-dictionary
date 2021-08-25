import axios from 'axios';

import baseURL from './baseURL';

export default axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        // Authorization: {
        //     toString() {
        //         return `Bearer ${getAccessToken()}`;
        //     }
        // },
        'Content-Type': 'application/json'
    }
});
