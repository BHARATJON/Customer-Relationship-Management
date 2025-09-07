import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import customerService from '../services/customerService';
import leadService from '../services/leadService';
import LeadForm from '../components/LeadForm';

const CustomerDetailView = () => {
    const [customer, setCustomer] = useState(null);
    const [leads, setLeads] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const { id } = useParams();

    const fetchCustomerDetails = async () => {
        try {
            const response = await customerService.getCustomer(id);
            setCustomer(response.data.customer);
            setLeads(response.data.leads);
        } catch (error) {
            console.error('Failed to fetch customer details', error);
        }
    };

    useEffect(() => {
        fetchCustomerDetails();
    }, [id]);

    const handleSaveLead = async (leadData) => {
        try {
            if (selectedLead) {
                await leadService.updateLead(selectedLead._id, leadData);
            } else {
                await leadService.createLead(id, leadData);
            }
            fetchCustomerDetails();
            setIsModalOpen(false);
            setSelectedLead(null);
        } catch (error) {
            console.error('Failed to save lead', error);
        }
    };

    const handleDeleteLead = async (leadId) => {
        try {
            await leadService.deleteLead(leadId);
            fetchCustomerDetails();
        } catch (error) {
            if (error.response) {
                console.error('Failed to delete lead:', error.response.data);
                alert('Failed to delete lead: ' + (error.response.data.msg || error.response.data.message || 'Unknown error'));
            } else {
                console.error('Failed to delete lead', error);
                alert('Failed to delete lead: Unknown error');
            }
        }
    };

    if (!customer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{customer.name}</h1>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Company:</strong> {customer.company}</p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Leads</h2>
            <div className="flex justify-end mb-4">
                <button onClick={() => { setSelectedLead(null); setIsModalOpen(true); }} className="px-4 py-2 text-white bg-indigo-600 rounded-md">
                    Add Lead
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Value</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead) => (
                            <tr key={lead._id}>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lead.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lead.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lead.status}</td>
                                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{lead.value}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-gray-200">
                                    <button onClick={() => { setSelectedLead(lead); setIsModalOpen(true); }} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    <button onClick={() => handleDeleteLead(lead._id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <LeadForm
                    lead={selectedLead}
                    onSave={handleSaveLead}
                    onCancel={() => {
                        setIsModalOpen(false);
                        setSelectedLead(null);
                    }}
                />
            )}
        </div>
    );
};

export default CustomerDetailView;