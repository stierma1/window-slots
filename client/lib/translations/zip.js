var Rx = require("rx");

module.exports = function(key1, key2, dataSources, rename){
    var dataSource1 = dataSources.get(key1);
    var dataSource2 = dataSources.get(key2);

    var newName = rename ? rename : key1 + "-zip-" + key2;

    var newSource = Rx.Observable.zip(dataSource1, dataSource2);
    dataSources.get("creationMap").set(newName, [key1, key2], [key1, key2], "zip");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("zip", module.exports);
}
