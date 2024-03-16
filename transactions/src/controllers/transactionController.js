const express = require('express');
const transactionController = require('./transactionController');
const router = express.Router();

router.get('/transactions', async (req, res) => {
    const transactions = await transactionController.getAllTransactions();
    res.json(transactions);
});

router.get('/transactions/:id', async (req, res) => {
    const transaction = await transactionController.getTransactionById(req.params.id);
    res.json(transaction);
});

router.get('/transactions/role/:role', async (req, res) => {
    const transactions = await transactionController.getTransactionsByRole(req.params.role);
    res.json(transactions);
});

router.post('/transactions', async (req, res) => {
    const newTransaction = await transactionController.createTransaction(req.body);
    res.json(newTransaction);
});

router.put('/transactions/:id', async (req, res) => {
    const updatedTransaction = await transactionController.updateTransactionStatus(req.params.id, req.body.status);
    res.json(updatedTransaction);
});

module.exports = router;