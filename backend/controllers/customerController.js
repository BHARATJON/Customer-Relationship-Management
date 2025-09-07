const Customer = require('../models/Customer');
const Lead = require('../models/Lead');

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Private
exports.createCustomer = async (req, res) => {
    const { name, email, phone, company } = req.body;

    try {
        const newCustomer = new Customer({
            name,
            email,
            phone,
            company,
            ownerId: req.user.id,
        });

        const customer = await newCustomer.save();
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all customers for a user
// @route   GET /api/customers
// @access  Private
exports.getCustomers = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;

    try {
        const query = {
            ownerId: req.user.id,
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ],
        };

        const customers = await Customer.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Customer.countDocuments(query);

        res.json({
            customers,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
// @access  Private
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        // Check user
        if (customer.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        const leads = await Lead.find({ customerId: req.params.id });

        res.json({ customer, leads });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Customer not found' });
        }
        res.status(500).send('Server Error');
    }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
exports.updateCustomer = async (req, res) => {
    const { name, email, phone, company } = req.body;

    // Build customer object
    const customerFields = {};
    if (name) customerFields.name = name;
    if (email) customerFields.email = email;
    if (phone) customerFields.phone = phone;
    if (company) customerFields.company = company;

    try {
        let customer = await Customer.findById(req.params.id);

        if (!customer) return res.status(404).json({ msg: 'Customer not found' });

        // Make sure user owns customer
        if (customer.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { $set: customerFields },
            { new: true }
        );

        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        // Check user
        if (customer.ownerId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Delete all leads related to this customer
        await Lead.deleteMany({ customerId: req.params.id });

    await Customer.deleteOne({ _id: customer._id });

        res.json({ msg: 'Customer and related leads removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Customer not found' });
        }
        res.status(500).send('Server Error');
    }
};