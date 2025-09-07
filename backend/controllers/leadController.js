const Lead = require('../models/Lead');
const Customer = require('../models/Customer');

// @desc    Create a new lead
// @route   POST /api/leads/customers/:customerId/leads
// @access  Private
exports.createLead = async (req, res) => {
    const { title, description, status, value } = req.body;
    const { customerId } = req.params;

    try {
        // Check if customer exists and belongs to the user
        const customer = await Customer.findById(customerId);
        if (!customer || customer.ownerId.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Customer not found or not authorized' });
        }

        const newLead = new Lead({
            title,
            description,
            status,
            value,
            customerId,
        });

        const lead = await newLead.save();
        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all leads for a customer
// @route   GET /api/leads/customers/:customerId/leads
// @access  Private
exports.getLeadsForCustomer = async (req, res) => {
    const { customerId } = req.params;

    try {
        // Check if customer exists and belongs to the user
        const customer = await Customer.findById(customerId);
        if (!customer || customer.ownerId.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Customer not found or not authorized' });
        }

        const leads = await Lead.find({ customerId });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
exports.updateLead = async (req, res) => {
    const { title, description, status, value } = req.body;

    // Build lead object
    const leadFields = {};
    if (title) leadFields.title = title;
    if (description) leadFields.description = description;
    if (status) leadFields.status = status;
    if (value) leadFields.value = value;

    try {
        let lead = await Lead.findById(req.params.id);

        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        // Check if user owns the customer associated with the lead
        const customer = await Customer.findById(lead.customerId);
        if (!customer || customer.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        lead = await Lead.findByIdAndUpdate(
            req.params.id,
            { $set: leadFields },
            { new: true }
        );

        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private
exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ msg: 'Lead not found' });
        }

        // Check if user owns the customer associated with the lead
        const customer = await Customer.findById(lead.customerId);
        if (!customer || customer.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await lead.remove();

        res.json({ msg: 'Lead removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Lead not found' });
        }
        res.status(500).send('Server Error');
    }
};