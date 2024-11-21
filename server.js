const express = require('express');
const paymentRoutes = require('./routes/paymentRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/payments', paymentRoutes);
app.use('/api/transactions', transactionRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
