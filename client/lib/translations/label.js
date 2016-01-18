

module.exports = function(key, label, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Label";

    var newSource = dataSource.map(function(val){
      var obj = {};
      obj[label] = val;
      return obj;
    });

    dataSources.get("creationMap").set(newName, key, [key, label], "label");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("label", module.exports);
}
