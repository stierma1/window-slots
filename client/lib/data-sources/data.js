"use strict"

var RX = require("rx");

module.exports = function(mockObj, interval){
  var source = Rx.Observable.of(mockObj);

  if(interval){
    source = source.merge(RX.Observable.interval(interval))
      .map(function(){
        return mockObj;
      });
  }

  return source;
};
