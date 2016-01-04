var Nools = require("./window-slots");
var nools = require("nools");

var flow = Nools(nools);

module.exports = function(){
  return {
    flow: flow,
    session: flow.getSession(),
    Action: flow.getDefined("Action"),
    WindowSlot: flow.getDefined("WindowSlot")
  };}
