const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Your cart management and Stripe payment routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
