

module.exports = function(rootElement, initContentTypes){
  var windowFrame = require("./window-frame")();
  var windowFrameEditor = require("./lib/contents/window-frame-editor");
  var ContentType = require("./lib/data-sources/content-types");
  var createSimpleDataView = require("./lib/contents/simple-data-view");
  var HttpRequest = require("./lib/data-sources/http-request");
  var contents = new ContentType(initContentTypes);
  var dataSources = {};
  dataSources.contentTypes = contents;
  var funcs = windowFrameEditor(rootElement, windowFrame, dataSources);
  funcs.HttpRequest = HttpRequest;
  funcs.createSimpleDataView = createSimpleDataView;
  funcs.dataSources = dataSources;
  return funcs;
}
