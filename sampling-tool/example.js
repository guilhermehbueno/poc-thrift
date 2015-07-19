var http = require("http");
var cookie = require('cookie');

http.get('http://192.168.50.4:8080', function(res) {

 var cookies = cookie.parse(res.headers['set-cookie'].join());
 console.log("Cookie: " + JSON.stringify(cookies));

}).on('error', function(e) {
    console.log("Got error: " + e.message);
});