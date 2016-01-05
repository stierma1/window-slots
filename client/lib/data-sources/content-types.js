"use strict"

var EE = require("events").EventEmitter;

class ContentType extends EE{
  constructor (initTypes){
    super();
    this.types = initTypes || {};
    this.on("get", (correlationId, key) => {
      this.emit(correlationId, this.types[key]);
    });
  }

  get(key){
    return this.types[key];
  }

  set(key, value){
    this.types[key] = value;
    this.emit("change");
  }

  keys(){
    var keys = [];
    for(var i in this.types){
      keys.push(i);
    }
    return keys;
  }

}

module.exports = ContentType;
