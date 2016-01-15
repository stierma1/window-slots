"use strict"

var EE = require("events").EventEmitter;

class Translations extends EE{
  constructor (initTranslations){
    super();
    this.translations = initTranslations || {};
    this.on("get", (correlationId, key) => {
      this.emit(correlationId, this.translations[key]);
    });

    this.on("subscribe", () => {
      this.emit("subscribed", this.translations);
    });
  }

  get(key){
    return this.translations[key];
  }

  set(key, value){
    this.translations[key] = value;
    this.emit("change", this.translations);
  }

  keys(){
    var keys = [];
    for(var i in this.translations){
      keys.push(i);
    }
    return keys;
  }

}

module.exports = Translations;
