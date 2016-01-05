"use strict"

var EE = require("events").EventEmitter;
var $ = require("jquery");
class HttpRequest extends EE{
  constructor (jqReqObj, interval){
    super();
    this.data = null;
    this.on("get", (correlationId) => {
      this.emit(correlationId, this.data);
    });
    setInterval(() => {
      $.ajax(jqReqObj).success((data) => {
        this.data = data;
        this.emit("data", this.data);
      });
    }, interval || 5000);
  }

  get(){
    return this.data;
  }

}

module.exports = HttpRequest;
