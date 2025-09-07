import React, { useState, useEffect } from 'react';

const CustomerForm = ({ customer, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    });

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    const { name, email, phone, company } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{customer ? 'Edit Customer' : 'Add Customer'}</h3>
                <form onSubmit={onSubmit} className="mt-2">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={name} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" value={email} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input type="text" name="phone" value={phone} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <input type="text" name="company" value={company} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={onCancel} className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerForm;
