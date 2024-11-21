const fs = require('fs');
const { generateInvoice } = require('./invoiceService');
const paymentQueue = [];
const priorityQueue = [];
const transactionStack = [];

function addPayment(req, res) {
  const { userId, amount, type } = req.body;
  paymentQueue.push({ userId, amount, type, timestamp: new Date() });
  res.send('Payment added to queue');
}

function addUrgentPayment(req, res) {
  const { userId, amount, type } = req.body;
  priorityQueue.push({ userId, amount, type, timestamp: new Date() });
  res.send('Urgent payment added to queue');
}

function getTransactions(req, res) {
  res.json(transactionStack);
}

function undoTransaction(req, res) {
  if (!transactionStack.length) return res.send('No transactions to undo');
  const lastTransaction = transactionStack.pop();
  res.json({ message: 'Last transaction undone', lastTransaction });
}

// Process payments
setInterval(() => {
  const payment = priorityQueue.length ? priorityQueue.shift() : paymentQueue.shift();
  if (!payment) return;
  const transaction = { ...payment, status: 'Processed', processedAt: new Date() };
  transactionStack.push(transaction);
  generateInvoice(transaction);
}, 5000);

module.exports = { addPayment, addUrgentPayment, getTransactions, undoTransaction };
