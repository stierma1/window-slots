
var windowFrame = require("./window-frame")();
var windowFrameEditor = require("./window-frame-editor");
var $ = require("jquery");
var counter = require("./lib/data-sources/counter");

$(document).ready(function(){
  var contents = contents || {};
  var dataSources = dataSources || {};
  windowFrameEditor($("body"), windowFrame, contents, dataSources);
  contents["hello-world"] = require("./hello-world-content");
  dataSources["counter"] = counter;
});
