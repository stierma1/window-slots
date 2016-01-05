var $ = require("jquery");

module.exports = function(key, event, dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = null;
      var handler = function(val){
        value = val;
        rerender();
      };
      dataSources[key].on(event, handler);

      return {
        render : function(){
          return $("<span></span>").append($("<h3>" + key + ":" + event + "</h3>")).append($("<p>" + JSON.stringify(value, null, 2) + "</p>"));
        }, unload: function(){
          dataSources[key].removeListener(event, handler);
        }
      };
    }
  };

  dataSources.contentTypes.set("simple-view-" + key, contentFactory);
}
