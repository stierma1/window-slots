var $ = require("jquery");

module.exports = function(rootElement, initContentTypes, initDataSources){
  var windowFrame = require("./window-frame")();
  var windowFrameEditor = require("./lib/contents/window-frame-editor");
  var ContentTypes = require("./lib/data-sources/content-types");
  var createSimpleDataView = require("./lib/contents/simple-data-view");
  var createHttpRequest = require("./lib/data-sources/http-request");
  var DataSources = require("./lib/data-sources/data-sources");
  var httpRequestGenerator = require("./lib/contents/http-request-generator");
  var simpleList = require("./lib/contents/simple-list");
  var simpleViewConnector = require("./lib/contents/simple-view-connector");
  var contents = new ContentTypes(initContentTypes);
  var dataSources = new DataSources(initDataSources);
  dataSources.set("contentTypes", contents);
  var funcs = windowFrameEditor(rootElement, windowFrame, dataSources);

  simpleList("dataSources", dataSources);
  simpleList("contentTypes", dataSources);
  simpleViewConnector(dataSources);

  funcs.createHttpRequest = createHttpRequest;
  funcs.createSimpleDataView = createSimpleDataView;
  funcs.dataSources = dataSources;

  dataSources.get("contentTypes").set("http-request-generator", httpRequestGenerator());
  return funcs;
}
