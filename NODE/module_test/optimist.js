var arg = require('optimist')
    .usage('Usage: $0 -x [num] -y [num]')
    .demand(['x','y'])
    .argv;
    console.log(arg.x);
    console.log(arg.y);
console.log(arg.x/arg.Y);