//= require vendor/modernizr.custom.08547
//= require vendor/zepto
//= require vendor/spin
(function(window, document, $) {
  // Prevent new vars in the Object's prototype
  // We can now skip hasOwnPrototype in most of the cases.
  if (Object.freeze) { Object.freeze(Object.prototype); }

  function log() {
    if (window.console && window.console.log) {
      return window.console.log.apply(window.console, arguments);
    }
  }

  function errorHandler(msg) {
    return function() {
      log(msg, arguments);
      $("#javascript-error").text(msg + ': ' + String(Array.prototype.slice.apply(arguments).join(', ')));
      $("html").addClass("no-js");
    }
  }
  window.onerror = errorHandler('JavaScript error');

  if (!Modernizr.audio) {
    $(errorHandler('HTML5 Audio not supported'));
    return;
  }

  log(window.navigator.userAgent);

  var clickType=((Modernizr.touch)?'touchstart':'click');
  if (window.navigator.userAgent == "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:18.0) Gecko/18.0 Firefox/18.0") {
    clickType = 'click';
  }
  log('click type', clickType);

  // Prevent iOS scrolling
  document.ontouchmove = function(e) {e.preventDefault()};

  var spinner = new Spinner({
    zIndex: 2,
    lines: 11,
    length: 25,
    width: 10,
    radius: 30,
    corners: 1.0,
    rotate: 0,
    trail: 44,
    speed: 1.0,
    shadow: 'on'
  });

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
    }
  }

  // Image setup
  $(function() {
    var $image = $("#angry-face");
    var $pane = $("#angry-pane");
    var originalWidth = $image.width();
    var originalHeight = $image.height();

    spinner.spin();
    $pane.append(spinner.el);

    function adjust() {
      var paneWidth = $pane.width();
      var paneHeight = $pane.height();

      var params = fill(originalWidth, originalHeight, paneWidth, paneHeight);
      $image.css(params);
    }

    adjust();
    $(window).resize(adjust);

    $image.css({
      opacity: 0
    });

    $image.on('load', function() {
      loaded(null, $image);
    });

    $image.on('error', errorHandler('image load error'));
  });


  // Sound setup
  $(function() {
    var $sound = $("#how-dare-you"),
      $image = $("#angry-face"),
      imageShown = false;

    // Remove autoplay if you have JavaScript
    $sound.attr("autoplay", null)

    $sound.on('timeupdate', function(e) {
      if (!imageShown && this.currentTime > 1) {
        imageShown = true;
        $image.css({ opacity: 1 });
      }
    });

    $sound.on('play', function() {
      imageShown = false;
      $image.css({ opacity: 0 });
    });

    $sound.on('loadeddata', function() {
      loaded(this, null);
    })

    $sound.on('error', errorHandler('audio loading error'));

    $(document).on(clickType, function() {
      log('playing');
      $sound[0].play();
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

    $pane.on(clickType, abort);

    $("#info-pane button.close").on(clickType, hidePane);
    $button.on(clickType, function(e) {
      abort(e);
      $pane.toggleClass("visuallyhidden");

      $(document).one(clickType, hidePane);
    });

    // supports install ?
    var mozApps = window.navigator.mozApps;
    if (mozApps) {
      var request = mozApps.getSelf();
      request.onsuccess = function() {
        var app = request.result,
          $button = $("<button></button>")

        $("#info-pane").append($button);
        if (!app) {
          $button.text('install');
          $button.one(clickType, function() {

            // Work around bug with relative urls
            webapp_url = String(window.location) + 'how-dare-you.webapp'
            var pending = mozApps.install(webapp_url);
            $button.text('installing...');
            pending.onsuccess = function () {
              $button.text('installed');
            };
            pending.onerror = errorHandler('Installation error');
          });
        } else if (app.status == 'installed') {
          $button.text('uninstall');
          $button.one(clickType, function() {
            var ret = app.uninstall();
            var uninstall = log('uninstall return', ret);
            uninstall.onsuccess = function() {
              $button.text('uninstalled');
            }
            uninstall.onerror = errorHandler('uninstall error');
          });
        } else {
          log('app status', app.status);
        }
      }

      request.onerror = errorHandler('MozApp error')
    }

  });

})(window, document, Zepto);
