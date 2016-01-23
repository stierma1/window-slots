"use strict"

var EE = require("events").EventEmitter;

class CreationMap extends EE{
  constructor (initMaps){
    super();
    this.cMaps = initMaps || {};
    this.on("get", (correlationId, key) => {
      this.emit(correlationId, this.cMaps[key]);
    });

    this.on("subscribe", () => {
      this.emit("subscribed", this.cMaps);
    });
  }

  get(key){
    return this.cMaps[key];
  }

  set(key, _from, args, type){
    this.cMaps[key] = {key:key, from:_from, args:args, type:type};
    this.emit("change", this.cMaps);
  }

  keys(){
    var keys = [];
    for(var i in this.cMaps){
      keys.push(i);
    }
    return keys;
  }

  creationPath(key, path){
    var path = path || [];
    var self = this;
    var currentCreation = this.cMaps[key];

    if(key && this.cMaps[key]){
      path.push(this.cMaps[key]);
      if(this.cMaps[key].from instanceof Array){
        this.cMaps[key].from.map(function(val){
          self.creationPath(val, path);
        });
        return path;
      } else {
        if(this.cMaps[key].type !== "feedback"){
          return this.creationPath(this.cMaps[key].from, path);
        }
      }
    } else {
      return path;
    }
  }

}

module.exports = CreationMap;
