console.log("Starting client");

var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8081/my-socket');
ws.on('open', function() {
    console.log("Connection opened");
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});