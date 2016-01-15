var $ = require("jquery");

module.exports = function(dataSources){

  var contentFactory = {
    load : function(rerender){
      var value = [];
      var suppressRerender = false;
      var indexTrans = dataSources.get("translations").get("index");

      var handler = function(val){
        value = dataSources.keys().filter(function(val){
          return val !== "contentTypes" && val !== "dataSources" && val !== "translations";
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

          var indexField = $("<input type='text'></input>");
          var renameField = $("<input type='text'></input>")

          var createButton = $("<input type='button' value='Create'></input>")
            .click(function(){
              var source = sourceSelect.val();
              var index = parseInt(indexField.val());
              var name = renameField.val();

              if(source && index !== NaN){
                indexTrans(source, index, dataSources, name);
              }
            });

          return $("<span></span>")
            .append($("<div></div>").append($("<span>Source: </span>")).append(sourceSelect))
            .append($("<div></div>").append($("<span>Index: </span>")).append(indexField))
            .append($("<div></div>").append($("<span>Name: </span>")).append(renameField))
            .append(createButton);

        }, unload: function(){
          suppressRerender = true;
          dataSources.removeListener("change", handler);
        }
      };
    }
  };

  dataSources.get("contentTypes").set("index-translation", contentFactory);
}
