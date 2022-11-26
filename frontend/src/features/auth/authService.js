import axios from 'axios';

const API_URL = '/api/users/';

//Register user
const register = async (userData) => {

    const response = await axios.post(API_URL, userData, {
        headers: {
            'authorization': userData.token
        }
    });

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

//Login user
const login = async (userData) => {

    const response = await axios.post(API_URL + 'login', userData);
    //Fix 
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
const update = async (userData) => {
    
    console.log(userData)
    const response = await axios.put(API_URL + "update", userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    console.log(response.data)
    return response.data;
};

const authService = {
    register,
    login,
    logout,

}

export default authService;