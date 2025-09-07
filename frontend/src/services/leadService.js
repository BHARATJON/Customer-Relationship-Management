import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/api/leads';

const getLeadsForCustomer = (customerId) => {
    return axios.get(`${API_URL}/customers/${customerId}/leads`, { headers: authHeader() });
};

const createLead = (customerId, data) => {
    return axios.post(`${API_URL}/customers/${customerId}/leads`, data, { headers: authHeader() });
};

const updateLead = (id, data) => {
    return axios.put(`${API_URL}/${id}`, data, { headers: authHeader() });
};

const deleteLead = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const leadService = {
    getLeadsForCustomer,
    createLead,
    updateLead,
    deleteLead,
};

export default leadService;
