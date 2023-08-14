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

// JavaScript code for handling the cart

let cartItems = []; // Array to store cart items

// Function to add item to cart
function addToCart(itemId, itemName, itemPrice, itemImage) {
  cartItems.push({ itemId, itemName, itemPrice, itemImage });
  updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
  const cartElement = document.getElementById('cart');
  cartElement.innerHTML = ''; // Clear previous cart content
  cartItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
      <p>${item.itemName} - $${item.itemPrice.toFixed(2)}</p>
      <img src="${item.itemImage}" alt="${item.itemName}">
    `;
    cartElement.appendChild(itemDiv);
  });
}

// Attach event listener to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemId = button.dataset.itemId;
    const itemName = button.dataset.itemName;
    const itemPrice = parseFloat(button.dataset.itemPrice);
    const itemImage = button.dataset.itemImage;
    addToCart(itemId, itemName, itemPrice, itemImage);
  });
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
