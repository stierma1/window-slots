var Rx = require("rx");

module.exports = function(key1, key2, dataSources, rename){
    var dataSource1 = dataSources.get(key1);
    var dataSource2 = dataSources.get(key2);

    var newName = rename ? rename : key1 + "-merge-" + key2;
    var newSource = Rx.Observable.zip(dataSource1, dataSource2)
      .map(function(val){

        if(!(val[0] instanceof Object)){
          throw new Error(newName + " received a non object from DataSource: " + key1);
        }
        if(!(val[1] instanceof Object)){
          throw new Error(newName + " received a non object from DataSource: " + key2);
        }
        var obj = {};
        for(var i in val[0]){
          obj[i] = val[0][i];
        }

        for(var i in val[1]){
          obj[i] = val[1][i];
        }

        return obj;
      });
    dataSources.get("creationMap").set(newName, [key1, key2], [key1, key2], "merge");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("merge", module.exports);
}
