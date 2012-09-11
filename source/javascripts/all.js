//= require vendor/zepto
//= require vendor/spin
(function(window, document, $) {
  // Prevent new vars in the Object's prototype
  // We can now skip hasOwnPrototype in most of the cases.
  if (Object.freeze) { Object.freeze(Object.prototype); }

  // Tell the CSS that JS is available
  $("html").removeClass("no-js");

  // Prevent iOS scrolling
  document.ontouchmove = function(e) {e.preventDefault()};

  var spinner = new Spinner({zIndex: 2});

  // Sound setup
  $(function() {
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
    if (sound) {
      loaded.sound = sound;
    }
    if (image) {
      loaded.image = image;
    }

    if (loaded.sound && loaded.image) {
      spinner.stop();
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
  $(function() {
    var $img = $("#angry-face");
    var $pane = $("#angry-pane");
    var originalWidth = $img.width();
    var originalHeight = $img.height();

    spinner.spin();
    $pane.append(spinner.el);

    function adjust() {
      var paneWidth = $pane.width();
      var paneHeight = $pane.height();

      var params = fill(originalWidth, originalHeight, paneWidth, paneHeight);
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


  // Info setup
  $(function() {
    var $button = $("#info-button"),
      $pane = $("#info-pane");

    function abort(e) {
      e.stopPropagation();
    }

    function hidePane(e) {
      abort(e);
      $pane.addClass("visuallyhidden");
    }

    $pane.on('click', abort);

    $("#info-pane button.close").on('click', hidePane);
    $button.on('click', function(e) {
      abort(e);
      $pane.toggleClass("visuallyhidden");

      $(document).one('click', hidePane);
    });

  });

})(window, document, Zepto);
