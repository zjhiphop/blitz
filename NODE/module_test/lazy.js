var Lazy = require('lazy');

var lazy = new Lazy;
lazy
  .filter(function (item) {
    return item % 2 == 0
  })
  .take(5)
  .map(function (item) {
    return item*2;
  })
  .join(function (xs) {
    console.log(xs);
  });
  

[0,1,2,3,4,5,6,7,8,9,10].forEach(function (x) {
  lazy.emit('data', x);
});
setTimeout(function () { lazy.emit('end') }, 100);