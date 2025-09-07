import React, { useState, useEffect } from 'react';

const LeadForm = ({ lead, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'New',
        value: ''
    });

    useEffect(() => {
        if (lead) {
            setFormData(lead);
        }
    }, [lead]);

    const { title, description, status, value } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{lead ? 'Edit Lead' : 'Add Lead'}</h3>
                <form onSubmit={onSubmit} className="mt-2">
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value={title} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea name="description" value={description} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"></textarea>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select name="status" value={status} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm">
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Converted</option>
                            <option>Lost</option>
                        </select>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Value</label>
                        <input type="number" name="value" value={value} onChange={onChange} className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
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

export default LeadForm;
