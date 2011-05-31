/**
 * @file
 * Handles js on client side
 */
var socket = new io.Socket('localhost');
socket.connect();
socket.on('message', function(m) {
  $('#draggable').css({
    left : m.x - $('#draggable').width(),
    top : m.y
  });
});

$(document).ready(function() {
  $('h2').html($.browser.webkit);
  var el = new Object();
  $('#draggable').draggable({
    drag : function(event, obj) {
      var pos = $('#draggable').position();
      if((pos.left + $('#draggable').width()) > $(window).width()) {
        el.x = $('#draggable').width() - ($(window).width() - pos.left);
        el.y = pos.top;
      } else {
        el.x = -1000;
        el.y = -1000;
      }
      socket.send(JSON.stringify(el));
    }
  });
});