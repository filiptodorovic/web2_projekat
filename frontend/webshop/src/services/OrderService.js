import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_ORDER_CONTROLLER = process.env.REACT_APP_ORDER_CONTROLLER;

export const checkoutOrder = async (orderData) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/checkout`,
        orderData,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}