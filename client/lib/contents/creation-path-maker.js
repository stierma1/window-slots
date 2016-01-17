var $ = require("jquery");
var utils = require("../utils");

module.exports = function(dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var creationMap = dataSources.get("creationMap");

      var handler = function(val){
        value = dataSources.keys().filter(function(val){
          return !utils.isCoreDataSource(val);
        });
        if(!suppressRerender){
          setTimeout(function(){rerender();},0);
        }
      };

      dataSources.on("change", handler);
      dataSources.once("subscribed", handler);
      dataSources.emit("subscribe");

      return {
        render : function(){
          var sourceSelect = $("<select></select>");
          var out = $("<textarea></textarea>");

          value.map(function(key){
            sourceSelect
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
          });

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();

              if(source){
                var path = creationMap.creationPath(source);
                console.log(JSON.stringify(path));
                out.val(JSON.stringify(path));
              }
            });

          return $("<span></span>")
            .append($("<h3>Creation Path Maker</h3>"))
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append(createButton))
            .append($("<div></div>").append(out));

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("creation-path-maker", contentFactory);
}
