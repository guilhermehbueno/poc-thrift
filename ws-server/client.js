console.log("Starting client");

var WebSocket = require('ws')
  , ws = new WebSocket('ws://192.168.50.4:8888');
ws.on('open', function() {
    console.log("Connection opened");
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});