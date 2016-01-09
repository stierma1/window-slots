var $ = require("jquery");

module.exports = function(key, dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = null;
      var suppressRerender = false;
      var handler = function(val){
        value = dataSources.get(key).keys();
        if(!suppressRerender){
          setTimeout(function(){rerender();},0);
        }
      };
      dataSources.get(key).on("change", handler);
      dataSources.get(key).once("subscribed", handler);
      dataSources.get(key).emit("subscribe");

      return {
        render : function(){
          return $("<span></span>").append($("<h3>" + key + "</h3>")).append($("<p>" + JSON.stringify(value, null, 2) + "</p>"));
        }, unload: function(){
          suppressRerender = true;
          subscription.dispose();
        }
      };
    }
  };

  dataSources.get("contentTypes").set("simple-list-" + key, contentFactory);
}
