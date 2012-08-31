//= require 'vendor/soundmanager2'
//= require 'vendor/jquery-1.8.1'

// Prevent iOS scrolling
document.ontouchmove = function(e) {e.preventDefault()};

soundManager.setup({
  url: '/javascripts/vendor/soundmanager2/swf',
  useFlashBlock: false,
  onready: function() {
    soundManager.createSound({
      id: 'how-dare-you',
      url: [
        '/sound/how-dare-you.mp3',
        '/sound/how-dare-you.mp4'
      ],
      autoLoad: true,
      autoPlay: true,
      volume: 100
    });
  }
});

jQuery("html").removeClass("no-js");

jQuery(function($) {
  var $img = $("#angry-face");
  var $wrapper = $("#angry-wrapper");
  var ratio = $img.width() / $img.height();

  function adjust() {
    wWidth = $wrapper.width();
    wHeight = $wrapper.height();
    wRatio = wWidth / wHeight;

    if (wRatio > ratio) {
      var width  = wWidth;
      var height = wWidth / ratio;
      var diff = (wHeight - height) / 2;

      $img.width( width );
      $img.height( height );
      $img.css({ top: diff, left: 0 });
    } else {
      var width  = wHeight * ratio;
      var height = wHeight;
      var diff = (wWidth - width) / 2;

      $img.width( width );
      $img.height( height );
      $img.css({ top: 0, left: diff });
    }

  }

  adjust();
  $(window).resize(adjust);

});
