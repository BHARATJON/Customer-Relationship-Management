const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createLead,
    getLeadsForCustomer,
    updateLead,
    deleteLead,
} = require('../controllers/leadController');

// @route   POST api/leads/customers/:customerId/leads
// @desc    Add a new lead for a specific customer
// @access  Private
router.post('/customers/:customerId/leads', auth, createLead);

// @route   GET api/leads/customers/:customerId/leads
// @desc    Get all leads for a customer
// @access  Private
router.get('/customers/:customerId/leads', auth, getLeadsForCustomer);

// @route   PUT api/leads/:id
// @desc    Update a lead
// @access  Private
router.put('/:id', auth, updateLead);

// @route   DELETE api/leads/:id
// @desc    Delete a lead
// @access  Private
router.delete('/:id', auth, deleteLead);

module.exports = router;
