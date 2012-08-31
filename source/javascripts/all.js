//= require 'vendor/jquery-1.8.1'

// Prevent iOS scrolling
document.ontouchmove = function(e) {e.preventDefault()};

jQuery("html").removeClass("no-js");

jQuery(function($) {
  $(document).click(function() {
    var player = document.getElementById("how-dare-you");
    player.play();
  });
});

function fill(width, height, containerWidth, containerHeight) {
  var ratio = width / height;
  var containerRatio = containerWidth / containerHeight;

  if (containerRatio > ratio) {
    var width = containerWidth;
    var height = containerWidth / ratio;
    var diff = (containerHeight - height) / 2;

    return {
      width: width,
      height: height,
      top: diff,
      left: 0
    }
  } else {
    var width  = containerHeight * ratio;
    var height = containerHeight;
    var diff = (containerWidth - width) / 2;

    return {
      width: width,
      height: height,
      top: 0,
      left: diff
    }
  }
}

jQuery(function($) {
  var $img = $("#angry-face");
  var $wrapper = $("#angry-wrapper");
  var originalWidth = $img.width();
  var originalHeight = $img.height();

  function adjust() {
    var wWidth = $wrapper.width();
    var wHeight = $wrapper.height();

    var params = fill(originalWidth, originalHeight, wWidth, wHeight);
    $img.css(params);
  }

  adjust();
  $(window).resize(adjust);

});
