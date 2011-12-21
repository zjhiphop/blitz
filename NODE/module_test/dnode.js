var dnode = require('dnode');

var server = dnode({
    mul : function (n, m, cb) { cb(n * m) }
});
server.listen(5050);