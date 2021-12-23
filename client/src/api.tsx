import axios from 'axios';
import { getAccessToken } from 'utils/authenticationService';
import { logoutUser } from 'utils/authService';

import baseURL from './baseURL';

const defaultApi = axios.create({
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

defaultApi.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err?.response?.status === 401) {
            logoutUser();
        }
        return Promise.reject(err);
    }
);
export default defaultApi;
