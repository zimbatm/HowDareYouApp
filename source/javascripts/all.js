//= require 'vendor/jquery-1.8.1'

// Prevent iOS scrolling
document.ontouchmove = function(e) {e.preventDefault()};

// Tell the CSS that JS is available
jQuery("html").removeClass("no-js");

// Sound setup
jQuery(function($) {
  var sound = $("#how-dare-you")

  // Remove autoplay if you have JavaScript
  sound.attr("autoplay", null)

  sound.on('loadeddata', function() {
    loaded(this, null);
  });

  $(document).on('click', function() {
    sound[0].play();
  });
});

function loaded(sound, image) {
  console.log('loaded', arguments);
  if (sound) {
    loaded.sound = sound;
  }
  if (image) {
    loaded.image = image;
  }

  if (loaded.sound && loaded.image) {
    loaded.sound.play();
    window.setTimeout(function() {
      loaded.image.css({ opacity: 1 });
    }, 1300);
  }
}

// Resize algorithm
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

// Image setup
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

  $img.css({
    opacity: 0,
  });

  $img.on('load', function() {
    loaded(null, $img);
  });

});
