import axios from 'axios';
import authHeader from "./authHeader";

const API_URL = '/api/users/';

//Register user
const register = async (userData) => {

    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData);
     
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Logout
const logout = () => {
    localStorage.removeItem('user');
}

//Update user info
const update = async (userData, token) => {
    
    const response = await axios.put(API_URL + "UPDATE", userData, authHeader);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const authService = {
    register,
    login,
    logout,
    update,
}

export default authService;