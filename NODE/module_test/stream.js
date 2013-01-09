var fs = require('fs');
process.stdin.pipe(fs.createWriteStream('./out.txt'));
process.stdin.resume();