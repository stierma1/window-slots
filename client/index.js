var $ = require("jquery");

module.exports = function init(rootElement, initContentTypes, initDataSources, initTranslations, initCreationMap, initDataSourceTypes){
  var windowFrame = require("./window-frame")();
  var windowFrameEditor = require("./lib/contents/window-frame-editor");
  var ContentTypes = require("./lib/data-sources/content-types");
  var Translations = require("./lib/data-sources/translations");
  var DataSourceTypes = require("./lib/data-sources/data-source-types");
  var CreationMap = require("./lib/data-sources/creation-map")
  var createSimpleDataView = require("./lib/contents/simple-data-view");
  var createHttpRequest = require("./lib/data-sources/http-request");
  var DataSources = require("./lib/data-sources/data-sources");
  var httpRequestGenerator = require("./lib/contents/http-request-generator");
  var simpleList = require("./lib/contents/simple-list");
  var simpleViewConnector = require("./lib/contents/simple-view-connector");
  var contents = new ContentTypes(initContentTypes);
  var dataSources = new DataSources(initDataSources);
  var translations = new Translations(initTranslations);
  var createMap = new CreationMap(initCreationMap);
  var dataSourceTypes = new DataSourceTypes(initDataSourceTypes);

  dataSourceTypes.set("http-request", require("./lib/data-sources/http-request"));
  dataSources.set("creationMap", createMap);
  dataSources.set("dataSourceTypes", dataSourceTypes);
  dataSources.set("contentTypes", contents);
  dataSources.set("translations", translations);

  require("./lib/translations/jsonpath").initialize(dataSources);
  require("./lib/translations/index").initialize(dataSources);
  require("./lib/translations/zip").initialize(dataSources);
  require("./lib/translations/flatten").initialize(dataSources);
  require("./lib/translations/merge").initialize(dataSources);
  require("./lib/translations/label").initialize(dataSources);
  require("./lib/translations/feedback").initialize(dataSources);
  require("./lib/translations/tap").initialize(dataSources);
  require("./lib/contents/jsonpath-translation")(dataSources);
  require("./lib/contents/index-translation")(dataSources);
  require("./lib/contents/zip-translation")(dataSources);
  require("./lib/contents/flatten-translation")(dataSources);
  require("./lib/contents/merge-translation")(dataSources);
  require("./lib/contents/label-translation")(dataSources);
  require("./lib/contents/build-creation-path")(dataSources);
  require("./lib/contents/feedback-translation")(dataSources);
  require("./lib/contents/tap-translation")(dataSources);

  var funcs = windowFrameEditor(rootElement, windowFrame, dataSources);

  simpleList("dataSources", dataSources);
  simpleList("contentTypes", dataSources);
  simpleViewConnector(dataSources);

  funcs.createHttpRequest = createHttpRequest;
  funcs.createSimpleDataView = createSimpleDataView;
  funcs.dataSources = dataSources;
  funcs.buildCreationPath = require("./lib/build-creation-path");
  require("./lib/contents/creation-path-maker")(dataSources);
  dataSources.get("contentTypes").set("http-request-generator", httpRequestGenerator());
  funcs.utils = require("./lib/utils");
  return funcs;
}


/*$(function(){
  var funcs = module.exports($("body"));
  //loadContent = funcs.loadContent;
  //createWindowSlot = funcs.createWindowSlot;
  funcs.createWindowSlot();
  funcs.loadContent("window-frame-editor", 1);

  var t = '[{"key":"hello-merge-world","from":["hello","world"],"args":["hello","world"],"type":"merge"},{"key":"hello","from":"b","args":["b","Hello"],"type":"label"},{"key":"b","from":"t-zip-t","args":["t-zip-t",0],"type":"index"},{"key":"t-zip-t","from":["t","t"],"args":["t","t"],"type":"zip"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"},{"key":"world","from":"t-zip-t","args":["t-zip-t","world"],"type":"label"},{"key":"t-zip-t","from":["t","t"],"args":["t","t"],"type":"zip"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"},{"key":"t","from":null,"args":[{"url":"http://jsonplaceholder.typicode.com/posts/1","method":"GET"},null],"type":"http-request"}]'
  var s = JSON.parse(t);

  funcs.buildCreationPath(s, funcs.dataSources)
})*/
