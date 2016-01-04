
var EE = require("events").EventEmitter;

var counter = new EE();
var count = 0;

setInterval(function(){
  counter.emit("count", count);
  count++;
}, 1000);

module.exports = counter;
