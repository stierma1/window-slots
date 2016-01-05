var $ = require("jquery");

module.exports = function(key, event, dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = null;
      var handler = function(val){
        value = val;
        setTimeout(function(){rerender();},0);
      };

      dataSources.get(key).on(event, handler);
      dataSources.get(key).once("subscribed", handler);
      dataSources.get(key).emit("subscribe");

      return {
        render : function(){
          return $("<span></span>").append($("<h3>" + key + ":" + event + "</h3>")).append($("<p>" + JSON.stringify(value, null, 2) + "</p>"));
        }, unload: function(){
          dataSources.get(key).removeListener(event, handler);
          dataSources.get(key).removeListener("subscribed", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("simple-view-" + key, contentFactory);
}
