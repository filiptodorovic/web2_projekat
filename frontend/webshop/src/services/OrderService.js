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

export const getAllOrders = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/get-all-orders`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};

export const getAllUserOrders = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/get-all-user-orders`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};

export const cancelOrder = async (orderId) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/cancel-order`,
        orderId,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}

export const getAllSellerNewOrders = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/get-all-seller-new-orders`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};

export const getAllSellerOldOrders = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_ORDER_CONTROLLER}/get-all-seller-old-orders`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};