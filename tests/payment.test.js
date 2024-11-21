const fs = require('fs');
const path = require('path');
const { addPayment, addUrgentPayment, processPayments } = require('../services/paymentService');
const { generateInvoice } = require('../services/invoiceService');

// Mock fs to prevent actual file system writes
jest.mock('fs');

describe('Payment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a regular payment to the payment queue', () => {
    const paymentQueue = [];
    const request = { userId: '123', amount: 50, type: 'regular' };
    
    addPayment(request, paymentQueue);
    expect(paymentQueue).toHaveLength(1);
    expect(paymentQueue[0]).toEqual(expect.objectContaining(request));
  });

  test('should add an urgent payment to the priority queue', () => {
    const priorityQueue = [];
    const request = { userId: '456', amount: 100, type: 'urgent' };
    
    addUrgentPayment(request, priorityQueue);
    expect(priorityQueue).toHaveLength(1);
    expect(priorityQueue[0]).toEqual(expect.objectContaining(request));
  });

  test('should process a payment and add it to the transaction stack', () => {
    const paymentQueue = [{ userId: '123', amount: 50, type: 'regular', timestamp: new Date() }];
    const priorityQueue = [];
    const transactionStack = [];
    
    processPayments(paymentQueue, priorityQueue, transactionStack);

    expect(paymentQueue).toHaveLength(0);
    expect(transactionStack).toHaveLength(1);
    expect(transactionStack[0]).toHaveProperty('status', 'Processed');
  });

  test('should generate an invoice for a processed transaction', () => {
    const transaction = {
      userId: '789',
      amount: 150,
      type: 'regular',
      timestamp: new Date(),
      status: 'Processed',
    };

    generateInvoice(transaction);

    const filePath = path.join(__dirname, '../data/invoices');
    expect(fs.mkdirSync).toHaveBeenCalledWith(filePath, { recursive: true });
    expect(fs.createWriteStream).toHaveBeenCalled();
  });
});
