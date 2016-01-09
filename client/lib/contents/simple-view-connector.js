var $ = require("jquery");
var createSimpleDataView = require("./simple-data-view");

module.exports = function(dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var handler = function(val){
        value = dataSources.keys().filter(function(val){
          return val !== "contentTypes" && val !== "dataSources";
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

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();

              if(source){
                createSimpleDataView(source, dataSources);
              }
            });

          return $("<span></span>")
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("simple-view-connector", contentFactory);
}
