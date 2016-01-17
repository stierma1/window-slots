
var JSONPath = require('jsonpath-plus');

module.exports = function(key, path, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Jsonpath";

    var newSource = dataSource.map(function(val){
      return JSONPath({json:val, path:path});
    })
    .catch(function(error){
      return error;
    });
    dataSources.get("creationMap").set(newName, key, [key, path], "jsonpath");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("jsonpath", module.exports);
}
