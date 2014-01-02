var chromelogger = require('chromelogger');
var http = require('http');

var server = http.createServer();

server.on('request', chromelogger.middleware);

server.on('request', function(req, res) {
  res.chrome.log('Message from Node.js %s', process.version);
  res.end('Hello World, jade');
});

server.listen(7357);