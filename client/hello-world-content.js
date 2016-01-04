var $ = require("jquery");

module.exports = {
  load : function(windowSlot, dataSources){
    var lastVal = 0;
    function rerender(){
      windowSlot.actions.rerender();
    }
    dataSources.counter.on("count",function(val){
      lastVal = val;
      rerender();
    });


    return {
      render : function(){
        return $("<p>Hello World " + lastVal + "</p>");
      }, unload: function(){

      }
    }
  }
}
