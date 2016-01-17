
module.exports.isCoreDataSource = function(key){
  return ["dataSources", "contentTypes", "creationMap", "translations", "dataSourceTypes"]
    .indexOf(key) !== -1;
}
