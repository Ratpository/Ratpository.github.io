$(document).ready(function () {
  // Logo
  var $logo = $('#logo');
  var $hellologo = $('#helloworld');
  if (location.href.indexOf("#") != -1) {
    if (location.href.substr(location.href.indexOf("#")) != '#about') {
      $logo.show();
    } else {
      $hellologo.show();
    }
  }

  // Show logo
  $('#tab-container .tab a').click(function () {
    $logo.slideDown('slow');
    $hellologo.slideUp('slow');
  });

  // Hide logo
  $('#tab-about').click(function () {
    $logo.slideUp('slow');
    $hellologo.slideDown('slow');
  });

  function animMeter() {
    $(".meter > span").each(function () {
      $(this)
        .data("origWidth", $(this).width())
        .width(0)
        .animate({
          width: $(this).data("origWidth")
        }, 1200);
    });
  }
  animMeter();

  $('#tab-container').easytabs({
    animate: true,
    updateHash: true,
    transitionIn: 'slideDown',
    transitionOut: 'slideUp',
    animationSpeed: 800,
    tabActiveClass: 'active'
  }).bind('easytabs:midTransition', function (event, $clicked, $targetPanel) {
    if ($targetPanel.selector == '#resume') {
      animMeter();
    }
  });

  // Add click event listeners to popup images
  $(".popup-image").click(function () {
    const newImageSrc = $(this).find("img").attr("src");
    $("#large-image").attr("src", newImageSrc).css("border", "3px solid #000"); // Add border style
  });

  // Add click event listeners to image links
  $(".image-link").click(function (event) {
    event.preventDefault();
    const targetId = $(this).data("target");
    $("#popup-container").css("display", "block");
    $("#" + targetId).css("display", "block");

    const clickedImageSrc = $(this).find("img").attr("src");
    $("#large-image").attr("src", clickedImageSrc);
  });

  // Add click event listeners to close buttons
  $(".cancel-button").click(function () {
    $("#popup-container").css("display", "none");
    $(".popup").css("display", "none");
  });
  
  var cart = [];

  // Handle clicking on image links to add products to cart
  $(".popup-image img").click(function () {
    var productId = $(this).data("product-id");
    var product = {
      id: productId,
      imageSrc: $(this).attr("src"),
    };
    cart.push(product);
    updateCartUI();
  });

  // Update the cart user interface
  function updateCartUI() {
    var cartItems = "";
    for (var i = 0; i < cart.length; i++) {
      cartItems += `<div class="cart-item">
                       <img src="${cart[i].imageSrc}" alt="Product ${i + 1}">
                     </div>`;
    }
    $("#cart").html(cartItems);
  }

// Array to store cart items
let cartItems = [];



function checkout() {
  // Process checkout logic here
  // ...
}

  // Handle the payment process
  document.querySelector('#payment-form').addEventListener('submit', function (event) {
    event.preventDefault();

    stripe.createToken(card).then(function (result) {
      if (result.error) {
        // Handle error
        console.error(result.error);
      } else {
        var token = result.token.id;
        fetch('/charge', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: token, cart: cart }), // Include the cart data
        })
        // Rest of the code...
      }
    });
  });
});
//-- CART --
// Function to toggle the cart sidebar
function toggleCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.classList.toggle('active');
}

// Attach event listener to the cart button
const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('click', toggleCartSidebar);

function toggleCartSidebar() {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.hidden = !cartSidebar.hidden; // Toggle the hidden attribute
}

// Attach event listener to the close button in the cart sidebar
const closeCartButton = document.getElementById('close-cart');
closeCartButton.addEventListener('click', toggleCartSidebar);

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
  let totalPrice = 0;

  cartItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <div class="item-image">
        <img src="${item.itemImage}" alt="${item.itemName}">
      </div>
      <div class="item-details">
        <p>${item.itemName}</p>
        <p>$${item.itemPrice.toFixed(2)}</p> <!-- Display item price -->
      </div>
    `;
    cartElement.appendChild(itemDiv);
    totalPrice += item.itemPrice;
  });

  // Display total price and purchase button
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `
    <p>Total: $${totalPrice.toFixed(2)}</p>
    <button id="purchase-button" onclick="initiatePurchase()">Purchase</button> <!-- Call initiatePurchase() on click -->
  `;
  cartElement.appendChild(totalDiv);
}


// Function to initiate the purchase process
function initiatePurchase() {
  // Here you can implement the logic to handle the purchase using Stripe or any other payment gateway
  // For this example, you can simply log the cart items
  console.log(cartItems);
}

// Attach event listener to purchase button
const purchaseButton = document.getElementById('purchase-button');
purchaseButton.addEventListener('click', () => {
  initiatePurchase();
});

// Attach event listener to "Add to Cart" buttons within popups
const addToCartPopupButtons = document.querySelectorAll('.popup .add-to-cart-button');
addToCartPopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    const itemId = button.dataset.itemId;
    const itemName = button.dataset.itemName;
    const itemPrice = parseFloat(button.dataset.itemPrice);
    const itemImage = button.dataset.itemImage;
    addToCart(itemId, itemName, itemPrice, itemImage);
  });
});

// Attach event listener to grid items
const gridItems = document.querySelectorAll('.grid-item');
gridItems.forEach(item => {
  item.addEventListener('click', () => {
    const itemId = item.dataset.itemId; // Assuming you have a data attribute "data-item-id" in your grid-item HTML
    const itemName = item.dataset.itemName; // Assuming you have a data attribute "data-item-name" in your grid-item HTML
    const itemPrice = parseFloat(item.dataset.itemPrice); // Assuming you have a data attribute "data-item-price" in your grid-item HTML
    const itemImage = item.querySelector('.image').getAttribute('src'); // Get the image source from the clicked grid-item
    addToCart(itemId, itemName, itemPrice, itemImage);
  });
});

// Initialize Stripe with your publishable key
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');

// Create a Stripe Elements card element
const elements = stripe.elements();
const cardElement = elements.create('card');

// Mount the card element to the DOM
cardElement.mount('#card-element');

// Handle form submission
const paymentForm = document.getElementById('payment-form');
paymentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Create a payment intent on your server
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: cartItems, // Send your cart items to the server
      currency: 'usd', // Replace with your preferred currency code
    }),
  });
  const data = await response.json();

  // Confirm the payment using the Stripe.js library
  const result = await stripe.confirmCardPayment(data.clientSecret, {
    payment_method: {
      card: cardElement,
      // Include any additional billing details if needed
    },
  });

  if (result.error) {
    // Handle payment error
    console.error(result.error.message);
  } else {
    // Payment succeeded, update UI or redirect
    console.log('Payment succeeded:', result.paymentIntent);
    // You can update the UI here or redirect to a success page
  }
});

// Show the cart sidebar and payment form when "Purchase" button is clicked
cartButton.addEventListener('click', () => {
  const cartSidebar = document.getElementById('cart-sidebar');
  cartSidebar.hidden = false;

  // Hide the payment form initially
  const paymentForm = document.getElementById('payment-form');
  paymentForm.style.display = 'none';

  // Add event listener to "Purchase" button in the cart
  const purchaseButton = document.getElementById('purchase-button');
  purchaseButton.addEventListener('click', () => {
    // Show the payment form when "Purchase" is clicked
    paymentForm.style.display = 'block';
  });
});