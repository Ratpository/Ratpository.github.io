const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define API routes

// Endpoint to add an item to the cart
app.post('/api/add-to-cart', (req, res) => {
  const { itemId, quantity } = req.body;
  // Add item to the cart and send a response
  // Replace this with your actual cart logic
  res.json({ message: 'Item added to cart successfully' });
});

// Endpoint to process checkout and payment
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, currency } = req.body;

    // Create a paymentIntent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateTotalAmount(items), // Calculate the total amount based on items
      currency,
    });

    // Send the paymentIntent client secret to the client
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the payment.' });
  }
});

// Calculate the total amount based on items
function calculateTotalAmount(items) {
  // Replace this with your actual calculation logic
  return 1000; // Example total amount in cents
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
