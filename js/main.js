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
