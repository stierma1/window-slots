var express = require("express");
/*var l = require("./client/index.js");
var s = l();

var t = '[{"key":"b","from":"t-zip-t","args":["t-zip-t",0],"type":"index"},{"key":"t-zip-t","from":["t","t"],"args":["t","t"],"type":"zip"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"}]'
var v = JSON.parse(t);

s.dataSources.get("dataSourceTypes").set("http-request", require("./lib/data-sources/http-request"));

s.buildCreationPath(v, s.dataSources);

s.dataSources.get("b").subscribe(function(val){
  console.log(val);
})
*/
var app = express();

app.use(express.static("./build"));

app.listen(8888);
