//= require vendor/zepto
//= require vendor/spin
(function(window, document, $) {
  // Tell the CSS that JS is available
  $("html").removeClass("no-js");


  // Prevent iOS scrolling
  document.ontouchmove = function(e) {e.preventDefault()};

  // Application cache setup
  var appCache = window.applicationCache;
  var spinner = new Spinner();

  function handleCacheEvent(e) {
    console.log(arguments);
  }

  function handleCacheError(e) {
    console.log('error', arguments);
  };

  // Fired after the first cache of the manifest.
  appCache.addEventListener('cached', handleCacheEvent, false);
  // Checking for an update. Always the first event fired in the sequence.
  appCache.addEventListener('checking', handleCacheEvent, false);
  // An update was found. The browser is fetching resources.
  appCache.addEventListener('downloading', handleCacheEvent, false);
  // The manifest returns 404 or 410, the download failed,
  // or the manifest changed while the download was in progress.
  appCache.addEventListener('error', handleCacheError, false);
  // Fired after the first download of the manifest.
  appCache.addEventListener('noupdate', handleCacheEvent, false);
  // Fired if the manifest file returns a 404 or 410.
  // This results in the application cache being deleted.
  appCache.addEventListener('obsolete', handleCacheEvent, false);
  // Fired for each resource listed in the manifest as it is being fetched.
  appCache.addEventListener('progress', handleCacheEvent, false);
  // Fired when the manifest resources have been newly redownloaded.
  appCache.addEventListener('updateready', handleCacheEvent, false);

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
    var $wrapper = $("#angry-wrapper");
    var originalWidth = $img.width();
    var originalHeight = $img.height();

    spinner.spin();
    $wrapper.append(spinner.el);

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

  // Prevent new vars in the Object's prototype
  // We can now skip hasOwnPrototype in most of the cases.
  if (Object.freeze) { Object.freeze(Object.prototype); }

  // Prevent new globals defintion
  // FIXME: Fails with
  //   Uncaught TypeError: Cannot set property 'toJSON' of undefined
  //   in Sizzle
  //Object.freeze && Object.freeze(this);

})(window, document, Zepto);
