import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import customerService from '../services/customerService';
import CustomerForm from '../components/CustomerForm';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await customerService.getCustomers(page, 10, search);
            setCustomers(response.data.customers);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch customers', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [page, search]);

    const handleSave = async (customerData) => {
        try {
            if (selectedCustomer) {
                await customerService.updateCustomer(selectedCustomer._id, customerData);
            } else {
                await customerService.createCustomer(customerData);
            }
            fetchCustomers();
            setIsModalOpen(false);
            setSelectedCustomer(null);
        } catch (error) {
            console.error('Failed to save customer', error);
        }
    };

    const handleDelete = async (customerId) => {
        try {
            await customerService.deleteCustomer(customerId);
            fetchCustomers();
        } catch (error) {
            console.error('Failed to delete customer', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-md"
                />
                <button onClick={() => { setSelectedCustomer(null); setIsModalOpen(true); }} className="px-4 py-2 text-white bg-indigo-600 rounded-md">
                    Add Customer
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
    <Link to={`/customers/${customer._id}`} className="text-indigo-600 hover:text-indigo-900">
        {customer.name}
    </Link>
</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{customer.company}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                    <button onClick={() => { setSelectedCustomer(customer); setIsModalOpen(true); }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDelete(customer._id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-md bg-gray-200"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-md bg-gray-200"
                >
                    Next
                </button>
            </div>
            {isModalOpen && (
                <CustomerForm
                    customer={selectedCustomer}
                    onSave={handleSave}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setSelectedCustomer(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
