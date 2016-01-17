module.exports = function(path, dataSources){

  for(var i = path.length - 1; i >= 0; i--){
    var node = path[i];
    var rename = node.key;

    if(dataSources.get(rename)){
      continue;
    }
    //if it has a from then it is a translation else its a data-source-type
    var func = null;

    if(node.from){
      func = dataSources.get("translations").get(node.type);
      func.apply(this, node.args.concat([dataSources, rename]));
    } else {
      func = dataSources.get("dataSourceTypes").get(node.type);
      dataSources.get("creationMap").set(rename, null, node.args, node.type);
      dataSources.set(rename, func.apply(this, node.args));
    }

  }

}
