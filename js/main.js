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

  // Add click event listeners to grid items
  $(".grid-item").click(function () {
    const newImageSrc = $(this).find("img").attr("src");
    $("#large-image").attr("src", newImageSrc);
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
});
