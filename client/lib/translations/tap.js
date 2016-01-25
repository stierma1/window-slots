var Rx = require("rx");
var EE = require("events").EventEmitter;

module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Tap";
    var emitter = new EE();

    var newSource = dataSource.tap(function(val){
      emitter.emit("data", ["data", val]);
    }, function(err){
      emitter.emit("data", ["error", err]);
    },function(){
      emitter.emit("done");
      emitter.removeAllListeners();
    }).publish().refCount();

    newSource.tapEmitter = emitter;

    dataSources.get("creationMap").set(newName, key, [key], "tap");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("tap", module.exports);
}
