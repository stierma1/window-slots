var $ = require("jquery");

module.exports = function(rootElement, initContentTypes, initDataSources, initTranslations){
  var windowFrame = require("./window-frame")();
  var windowFrameEditor = require("./lib/contents/window-frame-editor");
  var ContentTypes = require("./lib/data-sources/content-types");
  var Translations = require("./lib/data-sources/translations");
  var createSimpleDataView = require("./lib/contents/simple-data-view");
  var createHttpRequest = require("./lib/data-sources/http-request");
  var DataSources = require("./lib/data-sources/data-sources");
  var httpRequestGenerator = require("./lib/contents/http-request-generator");
  var simpleList = require("./lib/contents/simple-list");
  var simpleViewConnector = require("./lib/contents/simple-view-connector");
  var contents = new ContentTypes(initContentTypes);
  var dataSources = new DataSources(initDataSources);
  var translations = new Translations(initTranslations);
  dataSources.set("contentTypes", contents);
  dataSources.set("translations", translations);
  dataSources.get("translations").set("jsonpath", require("./lib/translations/jsonpath"));
  dataSources.get("translations").set("index", require("./lib/translations/index"));
  dataSources.get("translations").set("zip", require("./lib/translations/zip"));
  require("./lib/contents/jsonpath-translation")(dataSources);
  require("./lib/contents/index-translation")(dataSources);
  require("./lib/contents/zip-translation")(dataSources);

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

$(document).ready(function(){
  var funcs = module.exports($("body"));
  funcs.createWindowSlot();
  funcs.loadContent("window-frame-editor", 1);
});
