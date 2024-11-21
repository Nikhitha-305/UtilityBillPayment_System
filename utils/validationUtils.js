function validatePaymentInput({ userId, amount, type }) {
    if (!userId || !amount || !type) return false;
    if (typeof amount !== 'number' || amount <= 0) return false;
    return true;
  }
  
  module.exports = { validatePaymentInput };
  