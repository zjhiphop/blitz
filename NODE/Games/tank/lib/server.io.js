var io = require('socket.io'),
    app = require('expresss').createServer(),
    io.listen(app),
    util=require('util'); 
    app.listen('8888');
io.socket.on('connection', function(socket) {
    console.log(util.inspect(socket));
});