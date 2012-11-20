define([
], function(){
  var Canvas = function(options){
    var defaults = {
          selector: '#canvas',
          width: $(window).width(),
          height: $(window).height()
        },
        settings = $.extend({}, defaults, options),
        $el = $(settings.selector),
        el = $el[0],
        context = el.getContext('2d');

    el.height = settings.height;
    el.width = settings.width;

    return {
      settings: settings,
      $el: $el,
      el: el,
      context: context,
      clear: function(width, height){
        context.clearRect(0, 0, width || settings.width, height || settings.height);
      },
      resize: function(width, height, callback){
        el.width = settings.width = width || settings.width;
        el.height = settings.height = height || settings.height;

        if($.isFunction(callback)){
          callback.call();
        }
      }
    };
  };

  return Canvas;
});
