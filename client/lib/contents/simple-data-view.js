var $ = require("jquery");

module.exports = function(key, dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = null;
      var suppressRerender = false;
      var handler = function(val){
        value = val;
        if(!suppressRerender){
          setTimeout(function(){rerender();},0);
        }
      };

      var subject = dataSources.get(key);
      var subscription = subject.subscribe(function(data){
        handler(data);
      }, function(err){
        handler(err);
      });

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

  dataSources.get("contentTypes").set("simple-view-" + key, contentFactory);
}
