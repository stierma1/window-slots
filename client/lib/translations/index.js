

module.exports = function(key, num, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Index";

    var newSource = dataSource.map(function(val){
      return val[num];
    })
    .catch(function(error){
      return error;
    });
    dataSources.get("creationMap").set(newName, key, [key, num], "index");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("index", module.exports);
}
