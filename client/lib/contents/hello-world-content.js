var $ = require("jquery");

module.exports = {
  load : function(rerender, dataSources){
    var lastVal = 0;
    var handler = function(val){
      lastVal = val;
      rerender();
    };
    dataSources.get("counter").on("count",handler);

    return {
      render : function(){
        return $("<p>Hello World " + lastVal + "</p>");
      }, unload: function(){
        dataSources.get("counter").removeListener("count", handler);
      }
    };
  }
}
