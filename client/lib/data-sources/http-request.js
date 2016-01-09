"use strict"

var $ = require("jquery");
var RX = require("rx");

module.exports = function(jqReqObj, interval){
  var interval = RX.Observable.interval(interval || 5000);
  var subject = new RX.BehaviorSubject(1);

  return RX.Observable.merge(subject, interval)
  .map(function(){
    return RX.Observable.fromPromise($.ajax(jqReqObj).promise());
  })
  .flatMap(function(obs){
    return obs.catch(function(error){
      return Rx.Observable.return(error);
    });
  })
  .publish()
  .refCount();
};
