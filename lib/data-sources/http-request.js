var request = require("request");
var RX = require("rx");

module.exports = function(obj, interval){
  var interval = RX.Observable.interval(interval || 5000);
  var subject = new RX.BehaviorSubject(1);
  var req = RX.Observable.fromCallback(request);

  return RX.Observable.merge(subject, interval)
  .map(function(){
    return req(obj)
  })
  .flatMap(function(obs){
    return obs.catch(function(error){
      return Rx.Observable.return(error);
    });
  })
  .map(function(val){
    return val[2];
  })
  .publish()
  .refCount();
}
