import axios from "axios";
//Passing JWT
import authHeader from "../auth/authHeader";


const API_URL = '/api/orders/post'

//create new order
const createOrder = async (orderData) => {

    const response = await axios.post(API_URL, orderData, authHeader)

    return response.data
}

const orderService = {
    createOrder,
}

export default orderService