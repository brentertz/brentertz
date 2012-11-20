require.config({
  shim: {
  },

  paths: {
    underscore: 'vendor/underscore-min',
    jquery: 'vendor/jquery.min'
  }
});

requirejs(['jquery', 'underscore', 'app/app'],
function($, _, App){
  $(function(){
    var app = new App().init();
    window.app = app;
  });
});
