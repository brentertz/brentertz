require.config({
  shim: {
  },

  paths: {
    underscore: 'vendor/underscore-min',
    jquery: 'vendor/jquery.min' // Loaded separately via CDN
  }
});

requirejs(['underscore', 'app/app'],
function(_, App){
  $(function(){
    var app = new App().init();
    window.app = app;
  });
});
