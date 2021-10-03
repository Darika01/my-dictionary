import axios from 'axios';
import { getAccessToken } from 'utils/authenticationService';

import baseURL from './baseURL';

export default axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        Authorization: {
            toString() {
                return `Bearer ${getAccessToken()}`;
            }
        },
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
