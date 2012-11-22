define([
  'vendor/requestAnimFrame',
  'app/canvas'
], function(raf, Canvas){

  var App = function(){
  };

  App.prototype.init = function(){
    if(Modernizr.canvas) {
      this.canvas = new Canvas();
    }
    this.events();
    return this;
  };

  App.prototype.events = function(){
    this.loadBackground();
    this.handleResize();

    if(Modernizr.canvas && this.canvas){
      this.pixelate();
      this.animate(2000);
    }
  };

  App.prototype.handleResize = function(){
    var self = this;

    $(window).resize(
      _.debounce(function(){
          var width = $(window).width(),
              height = $(window).height();
          self.canvas.resize(width, height, $.proxy(self.pixelate, self), true);
      }, 300)
    );
  };

  App.prototype.loadBackground = function(){
    var class_name = 'bg-' + Math.round(Math.random() + 1);
    $('body').addClass(class_name);
  };

  App.prototype.pixelate = function(){
    var h = 60,
        w = h,
        x_pos = this.canvas.settings.width / w,
        y_pos = this.canvas.settings.height / h;

    for(var x = 0; x < x_pos; x++){
      for(var y = 0; y < y_pos; y++){
        var r,g,b;
        r = g = b = 255;
        var alpha = Math.random() * 0.75;
        this.canvas.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
        this.canvas.context.shadowColor = '#fff';
        this.canvas.context.shadowBlur = 5;
        this.canvas.context.fillRect(x * w, y * h, w, h);
      }
    }
  };

  App.prototype.animate = function(delay){
    var self = this;

    this.canvas.clear();
    this.pixelate();

    if(delay) {
      setTimeout(function(){
        requestAnimFrame(function(){
          self.animate(delay);
        });
      }, delay);
    }
    else {
      requestAnimFrame(function(){
        self.animate();
      });
    }
  };

  return App;
});
