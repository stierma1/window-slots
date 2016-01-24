var $ = require("jquery");
var createHttpRequest = require("../data-sources/data");
var uuid = require("uuid");

module.exports = function(){

  var contentFactory = {
    load : function(rerender, dataSources){

      return {
        render : function(){
          var nameUuid = uuid.v4();
          var nameField = $("<input type='text'></input>").attr("id", nameUuid);
          var intervalUuid = uuid.v4();
          var intervalField = $("<input type='text'></input>").attr("id", intervalUuid);
          var bodyUuid = uuid.v4();
          var bodyField = $("<textarea></textarea>").attr("id", bodyUuid);

          var submit = $("<input type='button' value='Create'></input>");

          submit.click(function(){
            var name = $("#" + nameUuid).val();
            var interval = parseInt($("#" + intervalUuid).val());
            var body = JSON.parse($("#" + bodyUuid).val() || "\"\"");

            if(name){
              var jqObj = body;
              dataSources.get("creationMap").set(name, null, [jqObj, interval], "data");
              dataSources.set(name, createHttpRequest(jqObj, interval));
              rerender();
            }
          });

          return $("<span></span>")
            .append("<h3>Data Generator</h3>")
            .append($("<div></div>").append($("<span>Name: </span>")).append(nameField))
            .append($("<div></div>").append($("<span>Interval: </span>")).append(intervalField))
            .append($("<div></div>").append($("<span>Data: </span>")).append(bodyField))
            .append($("<div></div>").append(submit));
        }, unload: function(){

        }
      };
    }
  };

  return contentFactory;
}
