"use strict"

var EE = require("events").EventEmitter;

class DataSourceTypes extends EE{
  constructor (initDataSources){
    super();
    if(initDataSources){
      return initDataSources;
    }
    this.dataSources = {};
    this.on("get", (correlationId, key) => {
      this.emit(correlationId, this.dataSources[key]);
    });
    this.on("subscribe", () => {
      this.emit("subscribed", this.dataSources);
    });
    this.set("dataSources", this);
  }

  get(key){
    return this.dataSources[key];
  }

  set(key, value){
    this.dataSources[key] = value;
    this.emit("change", this.dataSources);
  }

  keys(){
    var keys = [];
    for(var i in this.dataSources){
      keys.push(i);
    }
    return keys;
  }

}

module.exports = DataSourceTypes;
