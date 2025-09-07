const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Converted', 'Lost'],
        default: 'New',
    },
    value: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
});

module.exports = mongoose.model('Lead', LeadSchema);
