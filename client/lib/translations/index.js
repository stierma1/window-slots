

module.exports = function(key, num, dataSources, rename){
    var dataSource = dataSources.get(key);
    var newName = rename ? rename : key + "Index";

    var newSource = dataSource.map(function(val){
      return val[num];
    })
    .catch(function(error){
      return error;
    });

    dataSources.set(newName, newSource);
}
