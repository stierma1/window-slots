var Rx = require("rx");

module.exports = function(key, init, dataSources, rename){

    var newName = rename ? rename : key + "Feedback";

    var newSource = Rx.Observable.of(0)
      .flatMap(function(){
        var subscription = null;
        var source = Rx.Observable.fromEvent(dataSources.get(key).tapEmitter, "data")
          .map(function(val){
            if(val[0] === "data"){
              return val[1];
            } else if(val[0] === "error"){
              throw val[1];
            }
          })
          .takeUntil(Rx.Observable.fromEvent(dataSources.get(key).tapEmitter, "done"));

        return Rx.Observable.of(init).merge(source);
      });

    dataSources.get("creationMap").set(newName, key, [key,init], "feedback");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("feedback", module.exports);
}
