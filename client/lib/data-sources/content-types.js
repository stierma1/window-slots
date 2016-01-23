"use strict"

var EE = require("events").EventEmitter;

class ContentTypes extends EE{
  constructor (initTypes){
    super();
    this.types = initTypes || {};
    this.on("get", (correlationId, key) => {
      this.emit(correlationId, this.types[key]);
    });

    this.on("subscribe", () => {
      this.emit("subscribed", this.types);
    });
  }

  get(key){
    return this.types[key];
  }

  set(key, value){
    this.types[key] = value;
    this.emit("change", this.types);
  }

  keys(){
    var keys = [];
    for(var i in this.types){
      keys.push(i);
    }
    return keys.sort();
  }

}

module.exports = ContentTypes;
