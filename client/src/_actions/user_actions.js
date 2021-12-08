import axios from 'axios';

import { USER_SERVER } from '../components/Config.js';

export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: 'register_user',
        payload: request
    }
}

export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: 'login_user',
        payload: request
    }
}

export const saveProfile = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/saveProfile`, dataToSubmit)
        .then(response => response.data);

    return {
        type: 'profile_user',
        payload: request
    }
}

export const auth = () => {
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: 'auth_user',
        payload: request
    }
}

export const logoutUser = () => {
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: 'logout_user',
        payload: request
    }
}

