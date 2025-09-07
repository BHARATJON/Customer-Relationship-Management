const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customerController');

// @route   POST api/customers
// @desc    Add a new customer
// @access  Private
router.post('/', auth, createCustomer);

// @route   GET api/customers
// @desc    Get all customers for a user
// @access  Private
router.get('/', auth, getCustomers);

// @route   GET api/customers/:id
// @desc    Get a single customer
// @access  Private
router.get('/:id', auth, getCustomerById);

// @route   PUT api/customers/:id
// @desc    Update a customer
// @access  Private
router.put('/:id', auth, updateCustomer);

// @route   DELETE api/customers/:id
// @desc    Delete a customer
// @access  Private
router.delete('/:id', auth, deleteCustomer);

module.exports = router;
