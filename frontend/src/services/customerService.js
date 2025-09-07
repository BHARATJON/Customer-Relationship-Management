import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/customers';

const getCustomers = (page, limit, search) => {
    return axios.get(API_URL, {
        headers: authHeader(),
        params: { page, limit, search },
    });
};

const getCustomer = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
};

const createCustomer = (data) => {
    return axios.post(API_URL, data, { headers: authHeader() });
};

const updateCustomer = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
};

const deleteCustomer = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const customerService = {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};

export default customerService;
