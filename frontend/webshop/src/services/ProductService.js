import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
const REACT_APP_PRODUCT_CONTROLLER = process.env.REACT_APP_PRODUCT_CONTROLLER;



export const getAllSellersProducts = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/get-all-seller-products`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};

export const getAllProducts = async () => {
    return await axios.get(
        `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/get-all-products`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        });
};
  
export const addProduct = async (productData) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/add-product`,
        productData,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}

export const editProduct = async (productData) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/edit-product`,
        productData,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}

export const removeProduct = async (productData) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/remove-product`,
        productData,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}

export const updateProduct = async (productData) => {
    return await axios.post(
    `${REACT_APP_BASE_URL}/${REACT_APP_PRODUCT_CONTROLLER}/update-product`,
        productData,
        {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        }
    );
}