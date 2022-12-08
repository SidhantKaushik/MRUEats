import axios from "axios";

const API_URL = '/api/orders/'

//create new order
const createOrder = async (orderData, token) => {
    
    const config = {
        headers: {

            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, JSON.stringify({dateOrdered:"2354234"}), config)

    return response.data
}

const orderService = {
    createOrder,
}

export default orderService