var $ = require("jquery");
var utils = require("../utils");

module.exports = function(dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var jsonpath = dataSources.get("translations").get("jsonpath");

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

          value.map(function(key){
            sourceSelect
              .append($("<option></option>")
              .attr("value",key)
              .text(key));
          });

          var pathField = $("<textarea></textarea>");
          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();
              var path = pathField.val();
              var name = renameField.val();

              if(source && path){
                jsonpath(source, path, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append($("<span>Path: </span>")).append(pathField))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("jsonpath-translation", contentFactory);
}
