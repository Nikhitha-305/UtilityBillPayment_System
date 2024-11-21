const fs = require('fs');
const PDFDocument = require('pdfkit');
const { ensureDirectoryExists } = require('../utils/fileUtils');

function generateInvoice(transaction) {
  const dirPath = './data/invoices';
  
  // Ensure the 'data/invoices' directory exists
  ensureDirectoryExists(dirPath);

  const filePath = `${dirPath}/invoice_${transaction.userId}_${Date.now()}.pdf`;
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(filePath));
  doc.text(`Invoice for ${transaction.type} Payment`, { align: 'center' });
  doc.text(`User ID: ${transaction.userId}`);
  doc.text(`Amount: ${transaction.amount}`);
  doc.text(`Date: ${transaction.timestamp}`);
  doc.text(`Status: ${transaction.status}`);
  doc.end();
}

module.exports = { generateInvoice };
