
module.exports = function(key, dataSources, rename){
    var dataSource = dataSources.get(key);

    var newName = rename ? rename : key1 + "-zip-" + key2;

    var newSource = dataSource.map(function(val){
      var out = [];
      for(var i = 0; i < val.length; i++){
        if(val instanceof Array){
          for(var j = 0; j < val[i].length; j++){
            out.push(val[i][j]);
          }
        } else {
          out.push(val[i]);
        }
      }

      return out;
    })
    .catch(function(error){
      return error;
    });
    dataSources.get("creationMap").set(newName, key, [key], "flatten");
    dataSources.set(newName, newSource);
}

module.exports.initialize = function(dataSources){
  dataSources.get("translations").set("flatten", module.exports);
}
