import api from './api';

const register = (data) => api.post('register', data);
const login = (data) => api.post('login', data);

export {    
    register,
    login
}
